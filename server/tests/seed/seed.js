const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const {ObjectID} = require('mongodb');
const userOneId = new ObjectID();
const userTwoId = new ObjectID();


const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos, (error, docs) => {
      if (error) {
        return done(error);
      }
    });
  }).then(() => done());
};


const users = [{
  _id: userOneId,
  email: 'manski@email.com',
  password: 'usersOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
},{
  _id: userTwoId,
  email: 'mansko@email.com',
  password: 'usersOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userTwoId,
      access: 'auth'
    }, process.env.JWT_SECRET).toString()
  }]
}]


const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};



module.exports = {todos, populateTodos, users, populateUsers}