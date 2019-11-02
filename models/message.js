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


const Message = mongoose.model('Message', messageSchema)

module.exports = Message