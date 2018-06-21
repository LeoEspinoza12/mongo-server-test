// const MongoClient = require('mongodb').MongoClient;
const { MongoClient,  ObjectID } = require('mongodb');


// this is a method that takes two argument
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  // findOneAndUpdate(filter, update, options, callback)

  db.collection('Users').findOneAndUpdate(
    { 
      _id: new ObjectID('5b2553d1420b671dff44e174')
    }, {
      $set: {
        name: 'ola, senores',
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then( (result) => {
      console.log(result)
    })



  console.log('We are connected');
  db.close();
});