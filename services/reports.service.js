/**
 * @reports.service.js
 *
 * api related functionalities are written below
 */

/**
 * Loading Application level configuration data
 */
var config = require('../config/config.json');
var winston = require('../config/winston');
var userEntities = require('../helpers/user-entities');






/**
 * Loading external libraries used
 */
var request = require('request');

var _this = this;
var api = {};
api.getReports = getReports;
api.getObservationReport = getObservationReport;

module.exports = api;

/**
 * 
 * @param {*} getReports api is used to get the reports of all scholl names with observation names 
 */
async function getReports(req) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await userEntities.userEntities(req);
            if (data.status == "success") {
                let result = JSON.parse(data.data).result;
                let arrayOfEntity = [];
                await Promise.all(result.map(async ele => {
                    arrayOfEntity.push(ele._id);
                }));
                console.log("arrayOfEntity", arrayOfEntity);
                arrayOfEntity = ["5c70d7d92da51f754ca01f39", "5cebbefe5943912f56cf8e16", "5c6ce843723d0b1ecde8b2e8"]
                let reqBody = {
                    "entityIds": arrayOfEntity
                }

                let url = config.dhiti_config.api_base_url + config.dhiti_config.observationsByEntity;
                request({
                    headers: {
                        'x-auth-token': req.headers['x-auth-token'],
                        'Content-Type': 'application/json',
                    }, url: url, method: 'POST', json: reqBody
                }, async function (error, httpResponse, body) {
                    if (error) {
                        let obj = {
                            status: "failed",
                            // message: "failed during fetching school details ",
                            errorObject: error,
                            message: error.message,
                            stack: error.stack
                        };
                        winston.error(obj);
                        return reject(obj);
                    }

                    let responseObj = [];
                    console.log("body.data",body);
                    await Promise.all(body.map(function (ele) {
                        var obserationInfo = {
                            "observationName": ele.event.observationName,
                            "observationSubmissionId": ele.event.observationSubmissionId,
                            "entityId": ele.event.entityId,
                            "entityName": ele.event.entityName

                        }
                        responseObj.push(obserationInfo);
                    }));
                    return resolve({
                        status: "success",
                        message: "successfully got obseration By entity",
                        data: responseObj
                       
                    })
                });
            }
        } catch (error) {
            return reject({
                status: "failed",
                message: error,
                errorObject: error
            });
        }
        finally {
        }
    });
}

/**
 * getObservationReport is used to get the pdf report for instance level
 * it communicate with the dithi service to get the pdf
 * @param {*} req
 */
async function getObservationReport(req) {
    return new Promise(async (resolve, reject) => {
        try {

            let id = req.query.observationId;
        console.log("req",id);

       

            let url = config.dhiti_config.api_base_url + config.dhiti_config.instanceLevelPdfReports +'?submissionId='+id;
            
            console.log("url",url);
            request({
                    headers: {
                        'x-auth-token': req.headers['x-auth-token'],
                    }, url: url,
                }, async function (error, httpResponse, body) {
                    if (error) {
                        let obj = {
                            status: "failed",
                            // message: "failed during fetching school details ",
                            errorObject: error,
                            message: error.message,
                            stack: error.stack
                        };
                        winston.error(obj);
                        return reject(obj);
                    };

                  
                    return resolve(body)
                });
        }catch (error) {
            return reject({
                status: "failed",
                message: error,
                errorObject: error
            });
        }
        finally {
        }
    });
}
