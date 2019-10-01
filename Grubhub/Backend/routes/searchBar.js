var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const pool = require('../db');

//Search Item from buyer page
router.post('/searchRestaurant', function (req, res, next) {
    let pass = `Select restaurantId, restaurantName, cuisine from mydb.restOwner where restaurantId IN
    (select restId from mydb.item where itemName LIKE '%${req.body.itemName}%')`;
    let output = "Not Updated";
    pool.query(pass, function (error, result) {
        if (error) {
            console.log("error in results ");
            res.status(404).send(error)
        }
        else {
                result = JSON.stringify(result);
                console.log(result);
                // res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
                res.status(200).send(result);
        };
    });
    console.log(output);
});

//filter Item from buyer page based on cuisine
// router.post('/search', function (req, res, next) {
//     let pass = `Select restaurantId, restaurantName, cuisine from mydb.restOwner where cuisine= 
//  (Select cuisine from mydb.restOwner where restaurantId=
//     (select restId from mydb.item where itemName LIKE '%${req.body.itemName}%')`;
//     let output = "Not Updated";
//     pool.query(pass, function (error, result) {
//         if (error) {
//             console.log("error in results ");
//             res.status(404).send(error)
//         }
//         else {
//                 result = JSON.stringify(result);
//                 console.log(result);
//                 // res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
//                 res.status(200).send(result);
//         };
//     });
//     console.log(output);
// });

module.exports = router;
