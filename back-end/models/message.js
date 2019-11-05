const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

messageSchema.set('toJSON', { 
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Message = mongoose.model('Message', messageSchema)

module.exports = Message