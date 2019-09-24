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
const pool = require('../db');

app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource BUYER');
});

//Update Buyer
router.post('/updateBuyer', function (req, res, next) {
    let pass = `UPDATE mydb.buyer
SET
phone = '${req.body.phone}',
name = '${req.body.name}',
image = '${req.body.image}',
Address =  '${req.body.Address}'
WHERE buyerId = ${req.body.buyerId}`;
    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            //console.log('Body Content', req.body.password);
            //console.log(results[0].password);
            output = pool.query(`Select * from buyer where buyerId='${req.body.buyerId}'`, (update) => {
                res.status(200).send(update);
            });
        };
    });
    console.log(output);

});

// Buyer Sign In
router.post('/signInBuyer', function (req, res, next) {
    let pass = `Select * from mydb.buyer where email='${req.body.email}'`;
    let output = "Not success";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ", results[0]);
            throw error;
        }
        else if (results.length == 0) {
            output = "Incorrect userId";
            res.status(200).send(output);
        } else {
            console.log('Body Content', req.body.password);
            console.log(results[0].password);

            //const match = bcrypt.compare(hash, results.password);S
            bcrypt.compare(req.body.password, results[0].password, function (err, resSt) {
                if (resSt) {
                    console.log("COMPARE working-------------------")
                    output = "SuccessFull Login";

                    res.status(200).send(results[0]);
                }
                else {
                    console.log("not compare working-------------------")
                    output = "UnnSuccessFull Login";
                    res.status(200).send(output);
                }
            });

        };
    });
    console.log(output);

});

//Route to handle Post Request Call
router.post('/signUpBuyer', function (req, res) {

    console.log("Inside signUpBuyer Post Request");
    console.log("Req Body : ", req.body);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    pool.getConnection(function (error, conn) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Store hash in your password DB.

            var insertSignUp = `Insert into mydb.buyer 
            (firstName, lastName, email, password) Values 
            ('${firstName}','${lastName}' ,'${email}' ,'${hash}')`;
            pool.query(insertSignUp, function (error, results) {
                if (error) {
                    res.status(200).send("error");
                }
                else {
                    console.log("done");
                    res.status(201).send("Added Successfully");
                }
            });
        });
    });
})

module.exports = router;
