// library imports
const express = require('express');
const bodyParser = require('body-parser');

// local imports
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todos');
let {Users} = require('./models/user');

let app = express();

//body-parser takes the JSON object and attaches it to the request
  // app.use will take the middleware
    // and the return value from this json method is a function and 
      // that function is the middleware that wee need to   
        // give to express
app.use(bodyParser.json());


// middleware route
  // standard setup for resource creation -   /todos
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })  
  todo.save().then( (obj) => {
    res.send(obj)
  }, (err) => {
    res.status(400).send(err)
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e)
  })
})




app.listen(3000, () => {
  console.log(`port is connected to 3000`);
});



module.exports = {app}