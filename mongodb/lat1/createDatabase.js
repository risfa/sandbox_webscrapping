const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/debi";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

