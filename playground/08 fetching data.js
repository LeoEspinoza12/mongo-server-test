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

  db.collection('Users').find({
    name: 'manski'
  }).toArray().then((docs) => {
    console.log(docs)

  }, (err) => {
    console.log('Unable to fetch todos', err)
  })





  console.log('We are connected');
  db.close();
});