var express = require('express');
var router = express.Router();
// import the require dependencies
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const pool = require('../db');

app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource ITEM');
});

router.get('/getItem/:buyerId', function (req, res, next) {
    console.log("req param ", req.params.buyerId);
    let pass = `select * from mydb.item WHERE restId = '${req.params.restId}'`;

    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            //console.log('Body Content', req.body.password);
            console.log(results);
            item = JSON.stringify(results);
            res.cookie('item', item, { encode: String });
            res.status(200).send(results);
        };
    });
    console.log(output);
});


// //Update Buyer
// router.post('/updateBuyer', function (req, res, next) {
//     let pass = `UPDATE mydb.buyer
// SET
// phone = '${req.body.phone}',
// firstName = '${req.body.firstName}',
// lastName = '${req.body.lastName}',
// image = '${req.body.image}',
// address =  '${req.body.address}'
// WHERE buyerId = ${req.body.buyerId}`;
//     let output = "Not Updated";
//     pool.query(pass, function (error, results) {
//         if (error) {
//             console.log("error in results ");
//             throw error;
//         }
//         else {
//             //console.log('Body Content', req.body.password);
//             //console.log(results[0].password);
//             output = pool.query(`Select * from buyer where buyerId='${req.body.buyerId}'`, (update,result) => {
//                 buyer = JSON.stringify(result[0]);
//                 res.cookie('buyer', buyer, { encode: String });
//                 res.status(200).send(result[0]);
//             });
//         };
//     });
//     console.log(output);

// });

// Buyer Sign In
// router.post('/addItem', function (req, res, next) {
//     let pass = `Select * from mydb.buyer where email='${req.body.email}'`;
//     let output = "Not success";
//     pool.query(pass, function (error, results) {
//         if (error) {
//             console.log("error in results ", results[0]);
//             throw error;
//         }
//         else if (results.length == 0) {
//             output = "Login Failed";
//             res.cookie('loginFail', output, { encode: String });
//             res.status(200).send(output);
//         } else {
//             console.log('Body Content', req.body.password);
//             console.log(results[0].password);

//             //const match = bcrypt.compare(hash, results.password);S
//             bcrypt.compare(req.body.password, results[0].password, function (err, resSt) {
//                 console.log("bcrypt compare= ");
//                 if (resSt) {
//                     console.log("COMPARE working-------------------");
//                     output = "SuccessFull Login";
//                     buyer = JSON.stringify(results[0]);
//                     res.cookie('buyer', buyer, { encode: String });
//                     res.status(200).send(results[0]);
//                 }
//                 else {
//                     console.log("not compare working-------------------")
//                     output = {error:"UnSuccessFull Login"}
//                     res.status(200).send(output);
//                 }
//             });

//         };
//     });
//     console.log(output);
// });

//Route to handle Post Request Call
router.post('/addItem', function (req, res) {

    console.log("Inside addItem Post Request");
    console.log("Req Body : ", req.body);
    let itemName = req.body.itemName;
    let description = req.body.description;
    let itemPrice = req.body.itemPrice;
    let itemImage = req.body.itemImage;
    let restId = req.body.restId;
    let category = req.body.category;

    pool.getConnection(function (error, conn) {

        var additem = `Insert into mydb.item 
            (itemName, description, itemPrice, itemImage, restId) Values 
            ('${itemName}','${description}' ,'${itemPrice}' ,'${itemImage}','${restId}')`;

        pool.query(additem, function (error, results) {
            if (error) {
                res.status(200).send("additem query error");
            }
            else {
                pool.query(`Select * from mydb.item where restId=${restId}`, function (error, result) {
                    if (error) {
                        res.cookie('itemerror', "error in adding item", { maxAge: 900000, httpOnly: false, path: '/' });
                        res.status(200).send("fetch item after addition error");
                    }

                    else {
                        console.log("done");
                        res.cookie('cookie', result, { maxAge: 900000, httpOnly: false, path: '/' });
                        res.status(201).send(result);
                    }
                });
            }
        });
    })

});

module.exports = router;