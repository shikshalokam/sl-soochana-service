var https                   = require('https');
var http                    = require('http');
var express                 = require('express');
var path                    = require('path');
var bodyParser              = require('body-parser');
var fs                      = require('fs');

var emailNotifier                 = require('./controllers/v1/email.controller');

const swaggerUi             = require('swagger-ui-express');
const swaggerDocument       = require('./config/swagger.json');


// const swaggerSpec = swaggerJSDoc(options);


var config                  = require('./config/config.json');
var port                    = config.PORT;
var app                     = express();
var morgan                  = require('morgan');
var winston                 = require('./config/winston');

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 20000 }));

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Authorization, Content-Type, Accept,x-auth-token");
    res.header("Access-Control-Allow-Credentials", true);

    next();
});


app.use(morgan('combined', { stream: winston.stream })); 
var options = {
    explorer: true
  };
   
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  


app.use('/notify/api/v1/',authenticate,emailNotifier);

var httpServer = http.createServer( app);
httpServer.listen(port, function () {
    console.log('Server started on port  ', port)
});

