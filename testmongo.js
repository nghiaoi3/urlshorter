var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 var IP = process.env.IP
 
// Connection URL 
var url = 'mongodb:'+IP+':27017/urlshorter';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  db.close();
});
