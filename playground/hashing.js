
// make sure to go to install jsonwebtoken
  // then require it on the file
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

// create a data
var data = { id: 4 };

// using a method sign(), this method will hash your password
// you can check on the library 
  //     jwt.io
// the method will create three validation
// the header, payload, signature
  // the header is the type of algorithm
  // the payload is the data that you are encrypting
  // the signature is the key that you provide

let token = jwt.sign(data, 'secret');
console.log('the token value is: ', token);

// to decode the token
  // you can use the decode() method

let decode = jwt.decode(token, 'secret');
console.log('the decoded value: ', decode);


////////////////////////////////////////////////////
////////////////////////////////////////////////////
// PASSWORD //

let password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
  
let hashedpassword = '$2a$10$MjWMU1Cnc58oxoHEnk8aEOY5S0s4NWcL6CkUfnsTbr6VTLqi6lmHe';
  bcrypt.compare(password, hashedpassword, (err, res) => {
    console.log(res)
  })

})



