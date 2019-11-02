const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  passwordHash: {
    type: String,
    required: true
  },
  inbox: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  sent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
})

userSchema.set('toJSON', { 
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User