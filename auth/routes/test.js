let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let ejs = require('ejs');

// Store locally
let session = require('express-session');
let cookieParser = require('cookie-parser');
let expImg = express();
// Connect to database
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

// Go to the login page
router.get('/login', function (req, res) {
  // Reading html file
  fs.readFile('./views/login.html', function(err,data) {
    if (err) return console.log(err)
    res.setHeader('Content-Type', 'text/html');
    res.send(data)
    // console.log('async: ' + data.toString())
  })
})

// Go to the registration page
router.get('/regin', function (req, res) {
  fs.readFile('./views/register.html', function(err,data) {
    if (err) return console.log(err)
    res.setHeader('Content-Type', 'text/html');
    res.send(data)
  })
})

// Click the login trigger event
router.get('/process_get', function (req, res) {
    let response = {
      "userName":req.query.userName,
      "passWord":req.query.passWord
  };
  // Put in a cookie
  res.cookie('userInfo',response);
  // res.end(JSON.stringify(response));
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    // The db in the database is a fristNode and the table is userInfo, where you put the login information
    let dbo = db.db("fristNode");
    dbo.collection("userInfo").find().toArray((err, result)=> { // Returns all data in the collection
        if (err) throw err;
        console.log(result);
         let flag = false
        result.forEach( item => {
          if (item.name == req.query.userName) {
            flag = true
          }
          else {
            flag = false
            }
       })
       if(flag) {
          console.log(result, 'Successful Login');
          // The login page is displayed
          fs.readFile('./views/test.html', function(err,data) {
            if (err) return console.log(err)
            // res.setHeader('Content-Type', 'text/html');
            res.end(data,JSON.stringify(response))
          })
        } else {
          res.render('loginerror');
        }
        db.close();
    });
  });
})

// Click Register Trigger event
router.get('/regin_get', function (req, res) {
  let response = {
    "userName":req.query.userName,
    "passWord":req.query.passWord
  };
  
  res.cookie('userInfo',response);
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let dbo = db.db("fristNode");
    let myobj = {name: req.query.userName,password: req.query.passWord};
      dbo.collection("userInfo").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Successful Registration");
          db.close();
      });
  });
  fs.readFile('./views/login.html', function(err,data) {
    if (err) return console.log(err)
    res.setHeader('Content-Type', 'text/html');
    res.end(data,JSON.stringify(response))
  })
})

module.exports = router;