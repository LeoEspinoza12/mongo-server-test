// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');


// this is a method that takes two argument
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  

  /////////////////////////////////////////////////////////
    // this is the part that we will get the 
      // the data from the server
  db.collection('Todos').find().toArray().then((docs) => {
    console.log(docs)
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch todos', err)
  })
  
  console.log('We are connected');

  // always make sure to close the connect request
  db.close()
});