require('dotenv').config()
const messagesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Message = require('../models/message')
const User = require('../models/user')
const moment = require('moment')


messagesRouter.post('/', async (req, res, next) => {
  const { title, content, author, receiver } = req.body

  try {

    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    const newMessage = new Message({
      title,
      content,
      author,
      createdAt: moment().format('LLL'),
      receiver
    })

    const savedMessage = await newMessage.save()

    const newAuthor = await User.findOne({ username: author })
    newAuthor.sent = newAuthor.sent.concat(savedMessage._id)
    await newAuthor.save()

    const newReceiver = await User.findOne({ username: receiver })
    newReceiver.inbox = newReceiver.inbox.concat(savedMessage._id)
    await newReceiver.save()

    return res.status(201).send(savedMessage)
  }
  catch (error) {
    next(error)
  }
})

messagesRouter.get('/inbox', async (req, res, next) => {

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    const userWithInbox = await User.findById(user.id).populate('inbox')
    
    return res.send(userWithInbox.inbox)
  }
  catch (error) {
    next(error)
  }
})

messagesRouter.get('/sent', async (req, res, next) => {
  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    const userWithSent = await User.findById(user.id).populate('sent')
    
    return res.send(userWithSent.sent)
  }
  catch (error) {
    next(error)
  }
})


module.exports = messagesRouter