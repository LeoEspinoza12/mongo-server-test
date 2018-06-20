const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5b293ca6fadf8a53348f7ade';
// let id = new ObjectID();
let id = '5b25c772ec893b400d367c2a';

if (ObjectID.isValid(id)){
  
  User.findOne({_id: id}).then((user)=>{
    console.log('we have found one id', user)
  })

  User.findById(id).then((user) => {
    if(!user){
      return console.log('unable to find id')
    }
    console.log('we have found By id', user)
  }, (err) => {
    console.log(err)
  })

}