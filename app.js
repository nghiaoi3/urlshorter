var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://nghiaoi11:9732298@ds157621.mlab.com:57621/food';      

var express = require('express')
var app = express()
var port = process.env.PORT || 3000


  
app.get('/', function(req, res) {
    res.send('Hello from NGHIA, please enter timestamp in your URL query');
});



app.get('/new/:longurl(*)', function(req,res){
  
  res.send(req.params.longurl);
  console.log('longurl is '+req.params.longurl)
  
  MongoClient.connect(url, function (err, db) {
    
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    db.close();
  }
});



})

