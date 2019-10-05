var express = require('express');
var router = express.Router();
// import the require dependencies
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var cors = require('cors');
var mysql = require('mysql');
//require('dotenv').config();
const bcrypt = require('bcrypt');
const multer = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/buyer/')
    },
    filename:function(req,file,cb){
        cb(null,JSON.parse(req.cookies.buyer).buyerId+'.jpg');
    }
})

const upload= multer({storage:storage}); 
const saltRounds = 10;
const pool = require('../db');


app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource BUYER');
});

router.post("/upload", upload.single('productImage'),(req,res,next)=>{
    productImage=req.file.path;
    res.status(200).send(productImage);
})

router.get('/getBuyer/:buyerId', function (req, res, next) {
    console.log("req param ",req.params.buyerId);
    let pass = `select * from mydb.buyer WHERE buyerId = '${req.params.buyerId}'`;
    
    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            //console.log('Body Content', req.body.password);
            console.log(results[0]);
            buyer = JSON.stringify(results[0]);
            res.cookie('buyer', buyer, { encode: String });
            res.status(200).send(results[0]);
        };
    });
    console.log(output);
});


//Update Buyer
router.post('/updateBuyer', function (req, res, next) {
    let pass = `UPDATE mydb.buyer
SET
phone = '${req.body.phone}',
firstName = '${req.body.firstName}',
lastName = '${req.body.lastName}',
image = '${req.body.image}',
address =  '${req.body.address}'
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
            output = pool.query(`Select * from buyer where buyerId='${req.body.buyerId}'`, (update,result) => {
                buyer = JSON.stringify(result[0]);
                res.cookie('buyer', buyer, { encode: String });
                res.status(200).send(result[0]);
            });
        };
    });

});

// Buyer Sign In
router.post('/signInBuyer', function (req, res, next) {
    let pass = `Select * from mydb.buyer where email='${req.body.email}'`;
    let output = "Not success";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results : error returned from database");
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
                    buyer = JSON.stringify(results[0]);
                    res.cookie('buyer', buyer, { encode: String });
                    res.status(200).send(results[0]);
                }
                else {
                    console.log("not compare working-------------------");
                    data={
                        error: "Invalid login credentials"
                    };
                    output = "Invalid login credentials";
                    res.status(200).send(data);
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

            var emailcheck = `Select * from mydb.buyer where email='${email}' `;
            pool.query(emailcheck, function (error, results) {
                if (results.length>0) {
                    console.log("email id exists")
                    res.cookie('cookie', "error", { maxAge: 900000, httpOnly: false, path: '/' });
                    res.status(200).send("Email Id already exists!");
                    res.end();
                }
            });
            var insertSignUp = `Insert into mydb.buyer 
            (firstName, lastName, email, password) Values 
            ('${firstName}','${lastName}' ,'${email}' ,'${hash}')`;
            pool.query(insertSignUp, function (error, results) {
                if (error) {
                    res.cookie('cookie', "error", { maxAge: 900000, httpOnly: false, path: '/' });
                    res.status(200).send("error");
                    res.end();
                }
                else {
                    console.log("done");
                    res.cookie('cookie', "Added Successfully", { maxAge: 900000, httpOnly: false, path: '/' });
                    res.status(201).send("Added Successfully");
                }
            });
        });
    });
})

module.exports = router;
