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

const multer = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/restImage/')
    },
    filename:function(req,file,cb){
        cb(null,JSON.parse(req.cookies.owner).restaurantId+'rest'+'.jpg');
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

router.get('/getSection/:restaurantId', function (req, res, next) {
    console.log("req param ", req.params.restaurantId);
    let pass = `select * from mydb.section WHERE restId = '${req.params.restaurantId}'`;

    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            //console.log('Body Content', req.body.password);
            console.log(results);
            section = JSON.stringify(results);
            res.cookie('section', section, { encode: String });
            res.status(200).send(results);
        };
    });
    console.log(output);
});

// add new section
router.post('/addSection', function (req, res) {

    console.log("Inside addSection Post Request");
    console.log("Req Body : ", req.body);
    let sectionName = req.body.sectionName;
    let sectionDescription = req.body.sectionDescription;
    let restId = req.body.restaurantId;

    pool.getConnection(function (error, conn) {

        var addSection = `Insert into mydb.section (sectionName,sectionDescription, restId) 
            Values ('${sectionName}','${sectionDescription}' ,'${restId}')`;
        pool.query(addSection, function (error, results) {
            if (error) {
                res.status(200).send("additem query error");
            }
            else {
                pool.query(`Select * from mydb.section where restId=${restId}`, function (error, result) {
                    if (error) {
                        res.cookie('itemerror', "error in adding item", { maxAge: 900000, httpOnly: false, path: '/' });
                        res.status(200).send("fetch item after addition error");
                    } else {
                        result = JSON.stringify(result);
                        console.log(result);
                        res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
                        res.status(201).send(result);
                    }
                });
            }
        });
    })
});


//delete section
router.delete('/deleteSection/:sectionId', function (req, res, next) {
    let pass = `DELETE FROM mydb.item WHERE  sectionId='${req.params.sectionId}'`;
    let output = "Not success";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results --------", results);
            throw error;
        }
        else {
            pool.query(`DELETE FROM mydb.section WHERE sectionId='${req.params.sectionId}'`, function (error, results) {
                output = "Deleted";
                res.status(202).send(output);
            });
        }
    });
    console.log(output);
});

//Update section
router.post('/updateSection', function (req, res, next) {
    let pass = `UPDATE mydb.section
    SET
    sectionName='${req.body.sectionName}',
    sectionDescription='${req.body.sectionDescription}'
    WHERE sectionId = ${req.body.sectionId}`;

    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            output = pool.query(`Select * from mydb.section where sectionId='${req.body.sectionId}'`, (update, result) => {
                result = JSON.stringify(result);
                console.log(result);
                res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
                res.status(200).send(result);
            });
        };
    });
    console.log(output);

});

module.exports = router;
