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
const multer = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/owner/')
    },
    filename:function(req,file,cb){
        cb(null,JSON.parse(req.cookies.owner).restaurantId+'.jpg');
    }
})

const upload= multer({storage:storage}); 

router.post("/upload", upload.single('productImage'),(req,res,next)=>{
    productImage=req.file.path;
    res.status(200).send(productImage);
})

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/getOwner/:restaurantId', function (req, res, next) {
    console.log("req param ",req.params.restaurantId);
    let pass = `select * from mydb.restOwner WHERE restaurantId = '${req.params.restaurantId}'`;
    
    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            //console.log('Body Content', req.body.password);
            console.log(results[0]);
            owner = JSON.stringify(results[0]);
            res.cookie('owner', owner, { encode: String });
            res.status(200).send(results[0]);
        };
    });
    console.log(output);
});

// restOwner signUp
router.post('/signUpOwner', function (req, res) {

    console.log("Inside signUpOwner Post Request");
    console.log("Req Body : ", req.body);
    let owner_firstName = req.body.owner_firstName;
    let owner_lastName = req.body.owner_lastName;
    let owner_email = req.body.owner_email;
    let owner_password = req.body.owner_password;
    let owner_phone= req.body.owner_phone;
    let restaurantName = req.body.restaurantName;
    let zipCode = req.body.zipCode;
    let cuisine = req.body.cuisine;

    pool.getConnection(function (error, conn) {
        bcrypt.hash(owner_password, saltRounds, function (err, hash) {
            // Store hash in your password DB.

            var insertSignUp = `Insert into mydb.restOwner (owner_firstName,owner_lastName, owner_email, owner_password,owner_phone,restaurantName,zipCode,cuisine) Values ('${owner_firstName}','${owner_lastName}' ,'${owner_email}' ,'${hash}','${owner_phone}','${restaurantName}','${zipCode}','${cuisine}')`;
            pool.query(insertSignUp, function (error, results) {
                if (error) {
                    throw error;
                }
                else {
                    console.log("done");
                    output = pool.query(`Select * from mydb.restOwner where owner_email='${req.body.owner_email}'`, (update,result) => {
                        owner = JSON.stringify(result[0]);
                        res.cookie('owner', owner, { encode: String });
                        res.status(200).send(result[0]);
                    }
                    );
                }
            });
        });
    });
    

})

//Sign in Owner
router.post('/signInOwner', function (req, res, next) {
    let pass = `Select * from mydb.restOwner where owner_email='${req.body.owner_email}'`;
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
            bcrypt.compare(req.body.owner_password, results[0].owner_password, function (err, resSt) {
                if (resSt) {
                    console.log("COMPARE working-------------------")
                    output = "SuccessFull Login";
                    owner = JSON.stringify(results[0]);
                    res.cookie('owner', owner, { encode: String });
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
});

//Update Owner
router.post('/updateOwner', function (req, res, next) {
    let pass = `UPDATE mydb.restowner
    SET
    owner_firstName = '${req.body.owner_firstName}',
    owner_lastName = '${req.body.owner_lastName}',
    owner_phone = '${ req.body.owner_phone}',
    owner_Image = '${req.body.owner_Image}',
    cuisine = '${req.body.cuisine}',
    restaurantName = '${ req.body.restaurantName}',
    zipCode = '${req.body.zipCode}',
    restaurantImage = '${req.body.restaurantImage}'
    WHERE restaurantId = ${req.body.restaurantId}`;

    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            output = pool.query(`Select * from restOwner where restaurantId='${req.body.restaurantId}'`, (update,result) => {
                res.status(200).send(result[0]);
            });
        };
    });
});

module.exports = router;
