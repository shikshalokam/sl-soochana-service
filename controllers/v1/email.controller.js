var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');

var reportServ = require('../../services/email.service');


router.get('/reportsList', reportList);

module.exports = router;
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
