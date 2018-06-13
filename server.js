const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;





var app = express();

hbs.registerPartials(__dirname + '/views/partials');
////////////////////////////////////////////////

hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('makeLettersBig', (text) => {
  return text.toUpperCase()
})
////////////////////////////////////////////////

app.set('view engine', 'hbs');


app.use( (req, res, next) => {
  res.render('maintenance.hbs')
})

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
})




app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('<h1>this is me</h1>');
})

app.get('/home', (req, res) => {
  // res.send('<h1>about page</h1>');
  res.render('home.hbs', {
    title: 'Home Page',
    heading: 'Primary Display Page',
    items: 'cars',
    owner: 'Manski'
  })
})


app.get('/text', (req, res) => {
  // res.send('<h1>about page</h1>');
  res.render('text.hbs', {
    title: 'Text Page',
    heading: 'Text Page',
    items: 'house',
    owner: 'Manski 123'
  })
})

// app.get('/bad', (req, res) => {
//   res.send({
//     errorMessage: 'error'
//   } );
// })

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
