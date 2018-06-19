let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {ObjectID} = require('mongodb')


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id

  if (!ObjectID.isValid(id)){
    return res.status(404).send()
  } else {
    Todo.findById(id).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
      return console.log(todo)
    }).catch((e) => {
      res.status(400).send();
    });
  }
})



app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
};




// // library imports
// const express = require('express');
// const bodyParser = require('body-parser');

// // local imports
// let {mongoose} = require('./db/mongoose');
// let {Todo} = require('./models/todos');
// let {Users} = require('./models/user');

// let app = express();

// //body-parser takes the JSON object and attaches it to the request
//   // app.use will take the middleware
//     // and the return value from this json method is a function and 
//       // that function is the middleware that wee need to   
//         // give to express
// app.use(bodyParser.json());


// // middleware route
//   // standard setup for resource creation -   /todos
// app.post('/todos', (req, res) => {
//   let todo = new Todo({
//     text: req.body.text
//   })  
//   todo.save().then( (obj) => {
//     res.send(obj)
//   }, (err) => {
//     res.status(400).send(err)
//   });
// });

// app.get('/todos', (req, res) => {
//   Todo.find().then( (todos) => {
//     res.send({todos});
//   }, (e) => {
//     res.status(400).send(e)
//   });
// });




// app.listen(3000, () => {
//   console.log(`port is connected to 3000`);
// });



// module.exports = {app}