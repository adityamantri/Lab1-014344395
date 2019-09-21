var express = require('express');
var router = express.Router();
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


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// restOwner signUp
router.post('/signUpOwner', function (req, res) {

    console.log("Inside signUpBuyer Post Request");
    console.log("Req Body : ", req.body);
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let restaurantName = req.body.restaurantName;
    let zipCode = req.body.zipCode;

    pool.getConnection(function (error, conn) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Store hash in your password DB.

            var insertSignUp = `Insert into mydb.restOwner (name, email, password,restaurantName,zipCode) Values ('${name}' ,'${email}' ,'${hash}','${restaurantName}','${zipCode}')`;
            pool.query(insertSignUp, function (error, results) {
                if (error) {
                    throw error;
                }
                else {
                    console.log("done");
                    pool.query("Select* from restOwner");
                }
            });
        });
    });
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end("Added Successfully");

})

//Sign in Owner
router.post('/signInOwner', function (req, res, next) {
    let pass = `Select * from mydb.restOwner where email='${req.body.email}'`;
    let output = "Not success";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results --------", results);
            throw error;
        }
        else if (results.length == 0) {
            output = "Incorrect userId";
            res.status(200).send(output);
        } else {

            //const match = bcrypt.compare(hash, results.password);
            bcrypt.compare(req.body.password, results[0].password, function (err, resSt) {
                if (resSt) {
                    console.log("COMPARE working-------------------")
                    output = "SuccessFull Login";
                    res.status(200).send(results[0]);
                }
                else {
                    console.log("compare not  working-------------------")
                    output = "UnSuccessfull Login";
                    res.status(200).send(output);
                }
            });

        };
    });
    console.log(output);
});

//Update Buyer
router.post('/updateOwner', function (req, res, next) {
    let pass = `UPDATE mydb.restowner
    SET
    name = '${req.body.name}',
    phone = '${ req.body.phone}',
    ownerImage = '${req.body.ownerImage}',
    cuisine = '${req.body.cuisine}',
    restaurantName = '${ req.body.restaurantName}',
    zipCode = ${req.body.zipCode},
    restaurantImage = '${req.body.restaurantImage}'
    WHERE restaurantId = ${req.body.restaurantId}`;

    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            output = pool.query(`Select * from restOwner where restaurantId='${req.body.restaurantId}'`, (update) => {
                res.status(200).send(update);
            });
        };
    });
    console.log(output);

});

module.exports = router;
