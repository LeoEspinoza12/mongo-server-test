// the object (_id) for mongodb is not the same as SQL that is incrementing integer
// for the mongoDB the _id if different
// mongo is design to scale out easily
// meaning that it can add on more data base server to handle the extra load
// example you have 10000 visitors in your website. the mongo will handle
// the extra load by creating databases to divide the load

// that is why the _id are ramdomly selected. because when you user an incrementing integer
// for your id, you will be constantly communicating to your server to check for the last
// generated id. instead mongoDB makes a new unindentical id to and 
// use it as a documents identifier


// an object _id is made up of few different things
// 1. it is a 12 byte value
// 2. the first 4 is a time stamp
// 3. the next 3 is the machine identifier
// 4. next is the 2 byte process id that is uniquely generated
// 5. 3 byte counter
// 6. some random value


const MongoClient = require('mongodb').MongoClient;

// this is a method that takes two argument
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('We are connected');

  db.collection('Users').insertOne({
    
    // if mongodb cannot create id
    // you can also generate your own id by adding it in the object
    _id: 123456,

    name: 'manski',
    age: 25,
    address: 'Bensenville'
  }, (err, result) => {
    if (err) {
      return console.log('unable to add user', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2))
  })




  db.close()
});