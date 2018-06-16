// const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb');


// this is a method that takes two argument
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

    //////////////////////////////////////////////////////////////
    // you can use count to get the total number of databases in the server
  db.collection('Todos').find().count().then((count) => {
    console.log(`Total docs in the server is ${count}`)
  }, (err) => {
    console.log('Unable to fetch todos', err)
  })


  console.log('We are connected');
  db.close();
});