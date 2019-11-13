const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const got = require('./assets/js/got')


//conects to db. used mongo rather than mongoose so i can const db as client.db('seasonOne');
const uri = process.env.DB_CONNECTIONGOT;
MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, (err, client) => {
   if(err) {
      console.log('could not connect..\n',err);
   }
   console.log('Connected to DB!');

   //set names for db
   const db = client.db('seasonOne');
   const episodes = db.collection('got');

   //drop existing db with same name, insert new data form got.js
   episodes.drop();
   episodes.insertMany(got, (err, cursor) => {
    if (err) {
      console.log('something went wrong...');
    }
    console.log(cursor.insertedCount);
  });
  client.close();
});
