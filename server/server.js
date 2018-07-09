const config = require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const {authenticate} = require('./middleware/authenticate')



var app = express();
const port = process.env.PORT;


app.use(bodyParser.json());

///////////////////////////////////////////////////////
// app.post('/todos', authenticate, (req, res) => {
//   var todo = new Todo({
//     text: req.body.text,
//     _creator: req.user._id
//   });

//   todo.save().then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });

app.post('/todos', authenticate, async (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  try {
    const doc = await todo.save()
        res.send(doc);
  } catch(err){
    res.status(400).send(err);

  }
  
});




/////////////////////////////////////////////////////////
app.get('/todos', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({_creator: req.user._id})
      res.send({todos})
  } catch(err){
    res.status(400).send(e);
  }
  
});

/////////////////////////////////////////////////////////
app.get('/todos/:id', authenticate, async (req, res) => {
  var id = req.params.id

  if (!ObjectID.isValid(id)){
    return res.status(404).send()
  } 

  try{
    const todo = await Todo.findOne({ _id: id, _creator: req.user._id})
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    } catch(err){
      res.status(400).send();
    }
  
})


/////////////////////////////////////////////////////////
app.delete('/todos/:id', authenticate, async (req, res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send()
  } 
  
  try{
    const todo = await Todo.findOneAndRemove({_id: id, _creator: req.user._id})
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo})
  } catch(err){
    res.status(400).send()
  }
});

/////////////////////////////////////////////////////////
app.patch('/todos/:id', authenticate, async (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

   if (!ObjectID.isValid(id)) {
     return res.status(404).send()
   }
  
   if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
   } else {
      body.completed = false;
      body.completedAt = null;
   }

   try{
      const todo = await Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true});
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
   } catch(err){
     res.status(400).send();
   }
})



/////////////////////////////////////////////
// this process is used to create a user account to the 
// to the database. 

// app.post('/users', (req, res) => {
//   var body = _.pick(req.body, ['email', 'password'])
//   var user = new User(body);

//   user.save().then(() => {
//     return user.generateAuthToken();
//   }).then((token)=> {
//     res.header('x-auth', token).send(user)
//   }).catch( (e) => {
//     res.status(400).send(e);
//   });
// });


app.post('/users', async (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  const user = new User(body);

  try{ 
    await user.save()
    let token = await user.generateAuthToken();
    res.header('x-auth', token).send(user)
    return token
  } catch(err){
    res.status(400).send(err);
  }
  
});


/////////////////////////////////////////////////
// this get request is design to make
// authentication before returning the request
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
  // console.log(req.user._id)
})

/////////////////////////////////////////////////








/////////////////////////////////////////////////
// app.post('/users/login', (req, res) => {
//   var body = _.pick(req.body, ['email', 'password'])

//  User.findByCredentials(body.email, body.password).then((user) => {
//        return user.generateAuthToken().then((token) => {
//              res.header('x-auth', token).send(user);
//        });
//   // User.findByCredentials(body.email, body.password).then((user) => {
//   //   res.header('x-auth', token).send(body);
//     // res.send(body)
//   }).catch((err) => {
//     res.status(400).send()
//   })

// })


app.post('/users/login', async (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  try {
  const user = await User.findByCredentials(body.email, body.password)
  const token = await user.generateAuthToken()
  await res.header('x-auth', token).send(user);
  return token
    
    } catch(err) {
      res.status(400).send()
    }
    
    
  })


/////////////////////////////////////////////////




/////////////////////////////////////////////////
// app.delete('/users/me/token', authenticate, async (req, res)=>{
//   // console.log('asdf')
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send();
//   },() => {
//     res.status(400).send();
//   });
// });

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token)
    res.status(200).send()
  } catch(err){
    res.status(400).send();
  }
  
});
/////////////////////////////////////////////////









app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};

