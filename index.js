var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://nghiaoi11:9732298@ds157621.mlab.com:57621/food';      

var express = require('express')
var app = express()
var port = process.env.PORT || 3000

var shortid = require('shortid')
// use $ and @ instead of - and _ 
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

var validurl= require('valid-url')


app.get('/', function(req, res) {
    res.send('Hello from NGHIA, please enter timestamp in your URL query');
});




app.get('/new/:longurl(*)', function(req,res){
  
      var longurl = req.params.longurl;


    MongoClient.connect(url, function (err, db) {
      
      if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } 
    console.log('connect to the mongoDB');

var collection = db.collection('links')

// function 
var newlink = function (db, callback){
              if (err) {
    console.log('Error:', err);
  } 
        return callback(db);
    };
          
    // check if the longurl is a valid url
  if (validurl.isUri(longurl)) {
      
// if the url is valid
      //insert the valid url into the collection 'links' and its generated shortcode
      
    newlink (db, function(){
        
    
    var shortcode =  shortid.generate();
    console.log('code '+shortcode)
    var link = {url : longurl, short:shortcode};
      collection.insert(link);
      res.json({original_url: longurl, short_url: 'https://shielded-sea-69229.herokuapp.com/'+shortcode})
      db.close();
    });
      
  } else {
      // if the url is NOT valid

      res.json({  error:'Wrong URL format, and make sure you have a valid protocol and real site.'     })
  }
    
    
});

  

});



app.listen(port, function(){
    console.log('server is listening ' +port);
});
