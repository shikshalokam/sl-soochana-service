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


/**
 * Loading external libraries used
 */
var request = require('request');

var _this = this;
var api = {};
api.getReports = getReports;
module.exports = api;

/**
 * 
 * @param {*} getReports api is used to get the reports of all scholl names with observation names 
 */
async function getReports(req) {
    return new Promise(async (resolve, reject) => {
        try {
                    return resolve({
                        status: "success",
                        message: "successfully got obseration By entity",
                        data: responseObj
                       
                    })
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

