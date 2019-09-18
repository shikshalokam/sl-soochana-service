var express = require('express');
var router = express.Router();


var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');

var reportServ = require('../../services/reports.service');


// routes
router.get('/reportsList', reportList);
router.get('/getObservationReport',getObservationReport);
// router.post('/check',check);


module.exports = router;
// module.exports = router;


function reportList(req, res) {
          try{
            reportServ.getReports(req, res)
            .then(function (result) {
              res.send(result);
            }).catch(e => console.log("e",e));
         
          }catch(err){
            console.log("errr",err);
            }
  }
  function getObservationReport(req, res) {
            try{
              reportServ.getObservationReport(req, res)
              .then(function (result) {
                res.send(result);
              }).catch(e => console.log("e",e));
           
            }catch(err){
              console.log("errr",err);
              }
    }