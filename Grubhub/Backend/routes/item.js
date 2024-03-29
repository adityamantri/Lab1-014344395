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
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/item/')
    },
    filename: function (req, file, cb) {
        console.log(JSON.parse(req.cookies.getItemDetails).itemId)
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });
router.post("/upload", upload.single('productImage'), (req, res, next) => {
    // console.log(req.body);
    req.body.image = req.file.filename;
    let pass = `UPDATE item SET itemImage='${req.file.filename}' WHERE  itemId=${req.body.itemId}`;
    console.log(pass)

    let output = "Not success";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results--------", results);
            throw error;
        }
        else {
            console.log("Updated Image ")
            res.status(202).send(output);
        }
    });
    // productImage = req.file.path;
    // res.status(200).send(productImage);
})

app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource ITEM');
});

router.get('/getItem/:restaurantId', function (req, res, next) {
    console.log("req param ", req.params.restaurantId);
    let pass = `select * from mydb.item WHERE restId = '${req.params.restaurantId}' order by sectionId`;

    let output = "Not Updated";

    pool.query(`Select * from mydb.section where restId = '${req.params.restaurantId}'`, function (error, sectionResults) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            pool.query(pass, function (error, itemResults) {
                if (error) {
                    console.log("error in results ");
                    throw error;
                }
                else {
                    //console.log('Body Content', req.body.password);
                    console.log(itemResults);
                    res.cookie('item', itemResults, { encode: String });
                    res.status(200).send(JSON.stringify({ results: sectionResults, result: itemResults }));
                };
            });
            console.log(output);
        }
    });
});

//Route to handle Post Request Call
router.post('/addItem', function (req, res) {

    console.log("Inside addItem Post Request");
    console.log("Req Body : ", req.body);
    let itemName = req.body.itemName;
    let itemDescription = req.body.itemDescription;
    let itemImage = req.body.itemImage;
    let itemPrice = req.body.itemPrice;
    let restaurantId = req.body.restaurantId;
    let sectionId = req.body.sectionId;

    pool.getConnection(function (error, conn) {

        var additem = `Insert into mydb.item 
            (itemName, itemDescription, itemPrice, sectionId, restId) Values 
            ('${itemName}','${itemDescription}' ,'${itemPrice}' ,'${sectionId}','${restaurantId}')`;

        pool.query(additem, function (error, results) {
            if (error) {
                console.log(error);
                res.status(200).send("additem query error");
            }
            else {
                pool.query(`Select * from mydb.item where restId=${restaurantId}`, function (error, result) {
                    if (error) {
                        res.cookie('itemError', "error in adding item", { maxAge: 900000, httpOnly: false, path: '/' });
                        res.status(200).send("fetch item after addition error");
                    }
                    else {
                        console.log("done item Added");
                        result = JSON.stringify(result);
                        res.cookie('itemAdded', result, { maxAge: 900000, httpOnly: false, path: '/' });
                        res.status(201).send(result);
                    }
                });
            }
        });
    })

});

router.post('/deleteItem', function (req, res, next) {
    console.log("reached item delete")
    let item_id = null;
    let item_id1 = null;
    pool.query(`Select itemId from mydb.item where itemName='${req.body.itemName}' and restId=${req.body.restaurantId}`, function (error, results) {
        item_id = results;
        item_id1 = (item_id[0])['itemId'];
        console.log("item_id:::", item_id1)

        console.log("item id here:   ")
        let pass = `DELETE FROM mydb.item WHERE  itemId=${item_id1}`;
        console.log(pass)

        let output = "Not success";
        pool.query(pass, function (error, results) {
            if (error) {
                console.log("error in results--------", results);
                throw error;
            }
            else {
                console.log("deleted itemmmmmmmm")
                output = "Deleted";
                res.status(202).send(output);
            }
        });
    });
});

router.post('/updateItem', function (req, res, next) {
    let pass = `UPDATE mydb.item
    SET
    itemName='${req.body.itemName}',
    itemDescription='${req.body.itemDescription}',
    itemPrice= '${req.body.itemPrice}'
    WHERE itemId = ${req.body.itemId}`;

    let output = "Not Updated";
    pool.query(pass, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            output = pool.query(`Select * from mydb.item where itemId='${req.body.itemId}'`, (update, result) => {
                result = JSON.stringify(result);
                console.log(result);
                //res.cookie('item', result, { maxAge: 900000, httpOnly: false, path: '/' });
                res.status(200).send(result);
            });
        };
    });
    console.log(output);
});

router.post('/getItemDetails', function (req, res, next) {
    console.log("req param ", req.body.restaurantId);
    let pass = `select section.sectionName, item.itemName, 
    item.itemDescription, item.itemImage, item.itemPrice,
    item.itemId, section.sectionId from mydb.section natural join item 
    where restId=${req.body.restaurantId} and item.itemName='${req.body.itemName}'`;

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
            res.cookie('getItemDetails', section, { encode: String });
            res.status(200).send(section);
        };
    });
    console.log(output);
});

module.exports = router;
