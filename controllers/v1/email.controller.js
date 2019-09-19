var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');

var emailServ = require('../../services/email.service');


router.post('/emailService/sendEmail', sendEmail);

module.exports = router;
function sendEmail(req, res) {
          try{
            emailServ.sendEmail(req, res)
            .then(function (result) {
              res.send(result);
            }).catch(e => console.log("e",e));
         
          }catch(err){
            console.log("errr",err);
            }
  }
