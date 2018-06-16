
// we can also us the ES6 deconstruct to create create or
// call the method on the fly.


// const MongoClient = require('mongodb').MongoClient;
  // here we are basically deconstructing the properties of mongo and then we ca use them right away
const { MongoClient, ObjectID } = require('mongodb').MongoClient;

let obj = new ObjectID();
console.log(obj)

// this is a method that takes two argument
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('We are connected');

  db.close()
});