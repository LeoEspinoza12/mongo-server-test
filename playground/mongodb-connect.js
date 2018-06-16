


// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();
console.log(obj)

// this is a method that takes two argument
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('We are connected');

  // db.collection('Todos').insertOne({
  //   text: 'Do something stupid',
  //     completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // })

  // db.collection('Users').insertOne({
  //   name: 'manski',
  //   age: 25,
  //   address: 'Bensenville'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to add user', err);
  //   }
  //   console.log(result.ops[0]._id);
  //   console.log(result.ops[0]._id.getTimestamp());
  // })




  db.close()
});