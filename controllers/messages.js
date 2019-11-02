require('dotenv').config()
const messagesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Message = require('../models/message')
const User = require('../models/user')


messagesRouter.post('/', async (req, res, next) => {
  const { title, content, author, createdAt, receiver } = req.body

  try {

    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    const newMessage = new Message({
      title,
      content,
      author,
      createdAt,
      receiver
    })

    const savedMessage = await newMessage.save()

    const newAuthor = await User.findById(author)
    newAuthor.sent = newAuthor.sent.concat(savedMessage._id)
    await newAuthor.save()

    const newReceiver = await User.findById(receiver)
    newReceiver.inbox = newReceiver.inbox.concat(savedMessage._id)
    await newReceiver.save()

    return res.status(201).send(savedMessage)
  }
  catch (error) {
    next(error)
  }
  

  
})


module.exports = messagesRouter