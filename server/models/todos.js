const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
 text: {
     type: String,
     require: true, 
     minlength: 2,
     trim: true 
  },
   completed: {
     type: Boolean,
     require: true, 
     minlength: 2 
   },
   completedAt: {
     type: Number,
     default: null 
   }

});


module.exports = { Todo };