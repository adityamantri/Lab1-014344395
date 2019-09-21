var express = require('express');
var router = express.Router();
// import the require dependencies
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
//require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const pool = require('./db');

app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource BUYER');
});

router.post('/signInBuyer', function (req, res,next) {
    let pass = `Select password from mydb.buyer where email='${req.body.email}'`;
    let output="Not success";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ",results[0]);
            throw error;
        }
        else {
            console.log('Body Content',req.body.password);
            console.log(results[0].password);

            //const match = bcrypt.compare(hash, results.password);S
            bcrypt.compare(req.body.password, results[0].password, function (err, resSt) {
                if (resSt) {
                    console.log("COMPARE working-------------------")      
                    output="SuccessFull Login";
                    res.status(200).send(output);
                }
                else {
                    console.log("not compare working-------------------")      
                    output="UnnSuccessFull Login";   
                    res.status(200).send(output);          
                }
            });

        };
    });
    console.log(output);
    
});

//Route to handle Post Request Call
app.post('/signUpBuyer', function (req, res) {

    console.log("Inside signUpBuyer Post Request");
    console.log("Req Body : ", req.body);
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    pool.getConnection(function (error, conn) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Store hash in your password DB.

            var insertSignUp = `Insert into mydb.buyer (name, email, password) Values ('${name}' ,'${email}' ,'${hash}')`;
            pool.query(insertSignUp, function (error, results) {
                if (error) {
                    throw error;
                }
                else {
                    console.log("done");
                    pool.query("Select* from buyer");
                    
                }
            });
        });
    });

})

module.exports = router;
