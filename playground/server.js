const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found',
    name: 'Todo App v1.0'
  });
})

app.get('/users', (req, res) => {
  res.status(200).send([{
    name: 'manski',
      age: 25
  }, {
    name: 'yonski',
      age: 27
  }])
})



app.listen(7777, () => {
  console.log('server is up on 7777')
})

module.exports.app = app;