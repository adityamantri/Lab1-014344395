//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });

//Route to handle Post Request Call
app.post('/calculate', function (req, res) {
    console.log("req:",req)
    console.log("Inside Login calculate Request");
    let result=eval(req.body.key);
    console.log("Req Body : ", req.body);
    
    if(isNaN(result) || result === Infinity){
        result = "ERROR. Try Again";
    }
    else{
        result = result.toString(10);
    }

    res.writeHead(200);
    res.end(result);
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");