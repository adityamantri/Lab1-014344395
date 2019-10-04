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


// `select section.sectionName, item.itemName, 
//     item.itemDescription, item.itemPrice,
//     item.itemId, section.sectionId from mydb.section natural join item 
//     where restId=${req.body.restaurantId} and item.itemName='${req.body.itemName}'`;


router.post('/currentOrder', function (req, res, next) {
    console.log("req.body is--------", req)
    let pass = `Select series, buyer.firstName,buyer.address, itemName, orderItemQty, itemPrice, orderStatus 
    from mydb.orderFood natural join mydb.buyer where restId=? and orderStatus NOT IN ('DELIVERED','CANCEL')`;
    pool.query(pass, req.body.restId, function (error, result) {
        console.log("req.body.buyerId: ",req.body.restId)
        if (error) {
            console.log("error in results ", error);
            res.status(205).send(error)
        }
        else {
            console.log(result);
            // res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
            res.status(200).send(result);
        };
    });
});

//Search Item from buyer page
router.post('/pastOrder', function (req, res, next) {
    console.log("req.body is--------", req.body.cart)
    let pass = `Select series, buyer.firstName,buyer.address, itemName, orderItemQty, itemPrice, orderStatus 
    from mydb.orderFood natural join mydb.buyer where restId=? and orderStatus IN ('DELIVERED','CANCEL') `;
    pool.query(pass, req.body.restId, function (error, result) {
        console.log(req.body.restId)
        if (error) {
            console.log("error in results ", error);
            res.status(205).send(error)
        }
        else {
            console.log(result);
            // res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
            res.status(200).send(result);
        };
    });
});




router.post('/updateOrderStatus', function (req, res, next) {
    console.log("req.body is--------", req.body.cart)
    let maxOrderId = `Select MAX(orderId) AS sOrderId from mydb.orderFood`;
    pool.query(maxOrderId, function (error, result1) {
        //res=JSON.stringify(res);
        console.log(result1[0].sOrderId);
        arrf=[];
        req.body.cart.forEach(element => {
            let arrtemp = []
            arrtemp.push(result1[0].sOrderId + 1);
            arrtemp.push("NEW");
            element.forEach(elem => {
                arrtemp.push(elem)
            })
            arrf.push(arrtemp)
        });

        console.log('Final Arrayyyyyyyyyyyyyyyyyyyyy', arrf)
        let pass = `INSERT INTO mydb.orderFood
    (orderId, orderStatus, itemName, itemPrice,  orderItemQty, restId, restName, buyerId) VALUES ?`

        let output = "Not Updated";
        pool.query(pass, [arrf], function (error, result) {
            if (error) {
                console.log("error in results", error);
                res.status(205).send(error)
            }
            else {
                result = { output: "order accepted" };
                console.log(result);
                // res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
                res.status(200).send(result);
            };
        });
        console.log(output);
    });

})

module.exports = router;