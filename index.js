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
      var longurl = req.params.longurl;

  res.send(req.params.longurl);
  console.log('longurl is '+req.params.longurl);
  
    MongoClient.connect(url, function (err, db) {
      
    // create a collection 'links'
    var collection = db.collection('links');
    
    //defining a function to create a new link
    var newlink = function (db,callback){
          };
    
    //insert longurl into the collection 'links'
    newlink (db, function(){
      var link = {url : longurl, short: 'test'};
      collection.insertOne(link);
      db.close();
    });
    
    
    
    
    
    
    
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log(db.links.find());

    db.close();
  }
});

});

  





app.listen(port, function(){
    console.log('server is listening ' +port);
});
