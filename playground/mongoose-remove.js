const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({})
// Todo.remove({}).then((result)=>{
// console.log(result)
// })


// Todo.findOneAndRemove() return the object id removed
// Todo.findOneAndRemove()


// Todo.findByIdAndRemove() return the object id removed
Todo.findByIdAndRemove('5b2a9cced13e6e4d6b610ae8').then((doc) => {
    // the doc return are the object of the id that you removed
  console.log(doc)
})