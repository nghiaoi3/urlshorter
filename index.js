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
    res.send('Hello from NGHIA, please provide your URL needed a short code. \n Example: https://shielded-sea-69229.herokuapp.com/new/&#34your URL&#34');
});


// GET longurl 
app.get('/new/:longurl(*)', function(req,res){
  
      var longurl = req.params.longurl;


    MongoClient.connect(url, function (err, db) {
      
      if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } 
    console.log('connect to the mongoDB');

//new links will be stored in the collection 'links'
var collection = db.collection('links')

// function  add newlink
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

//GET short url -> redirection
app.get('/:short', function(req,res){
        var shortcode = req.params.short;

   MongoClient.connect(url, function (err, db) {
      
      if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } 
      console.log('connect to the mongoDB');
      
      //fetch data from the collection 'links'
var collection = db.collection('links')

      // function  find link
var findlink = function (db, callback){
              if (err) {
    console.log('Error:', err);
  } 
        return callback(db);
    };


findlink(db, function() {
console.log('type code is '+typeof shortcode)

    collection.findOne({short:shortcode},{url:1,_id:0}, function(err, doc){
if (err) {
    console.log('ERRORR!!!!')
}
          if (doc !=null ) {
      console.log('FOUND a record!!');  
        
        // redirect to the corresponding original url
        res.redirect(doc.url)
} else {
            console.log(doc);  
            // return error JSON
res.json({error:'NOT FOUND a record corresponding with THIS SHORT LINK in THE DATABASE'})
}
            })
    
}
    )
   });
  
});

app.listen(port, function(){
    console.log('server is listening ' +port);
});
