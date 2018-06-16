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

  // deleteMany
    // db.collection('Todos').deleteMany({name: 'manski'}).then( (result) => {
    //   console.log(result)
    // })



  // deleteOne
    // db.collection('Todos').deleteOne( { text: 'write codes' } ).then( (result) => {
    //   console.log(result)
    // })



  // findOneAndDelete
    db.collection('Todos').findOneAndDelete({ text: 'ola' }).then((result) => {
      console.log(result);
      console.log(result.value)
    })

  console.log('We are connected');
  db.close();
});