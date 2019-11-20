require('dotenv').config()
const messagesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Message = require('../models/message')
const User = require('../models/user')
const moment = require('moment')
const io = require('../socket/socket')


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

messagesRouter.post('/reply', async (req, res, next) => {
  const { messageId, content } = req.body

  try {

    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const message = await Message.findById(messageId)

    const newMessage = new Message({
      author: message.receiver,
      receiver: message.author,
      content,
      title: message.title.includes('Re: ') ? message.title : 'Re: ' + message.title,
      createdAt: moment().format('LLL')
    })

    const savedMessage = await newMessage.save()

    const newAuthor = await User.findOne({ username: savedMessage.author })

    newAuthor.sent = newAuthor.sent.concat(savedMessage)
    await newAuthor.save()

    const newReceiver = await User.findOne({ username: savedMessage.receiver })
    newReceiver.inbox = newReceiver.inbox.concat(savedMessage)
    await newReceiver.save()

    io.getIo().emit('mail', { receiver: newReceiver.username, author: newAuthor.username, mail: savedMessage })

    return res.status(201).send(savedMessage)

  } catch (error) {
    next(error)
  }

})

messagesRouter.post('/send', async (req, res, next) => {
  const { username, title, content } = req.body

  try {

    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const newMessage = new Message({
      author: user.username,
      receiver: username,
      content,
      title,
      createdAt: moment().format('LLL')
    })

    const savedMessage = await newMessage.save()

    const author = await User.findById(user.id)

    author.sent = author.sent.concat(savedMessage)
    await author.save()

    const receiver = await User.findOne({ username })

    receiver.inbox = receiver.inbox.concat(savedMessage)
    await receiver.save()

    io.getIo().emit('mail', { receiver: receiver.username, author: author.username, mail: savedMessage })

    return res.status(201).send(savedMessage)

  } catch (error) {
    next(error)
  }

})

messagesRouter.get('/inbox', async (req, res, next) => {

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const userWithInbox = await User.findById(user.id).populate('inbox')

    return res.send(userWithInbox.inbox.sort((a, b) => b.createdAt - a.createdAt))
  }
  catch (error) {
    next(error)
  }
})

messagesRouter.get('/sent', async (req, res, next) => {
  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const userWithSent = await User.findById(user.id).populate('sent')

    return res.send(userWithSent.sent.sort((a, b) => b.createdAt - a.createdAt))
  }
  catch (error) {
    next(error)
  }
})

messagesRouter.post('/delete', async (req, res, next) => {
  const { id, source } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const messageToDelete = await Message.findById(id)
    const sentUser = await User.findOne({ username: messageToDelete.author })
    const reveiverUser = await User.findOne({ username: messageToDelete.receiver })

    if (source === 'inbox') {
      reveiverUser.inbox = reveiverUser.inbox.filter(mailId => mailId.toString() !== id)
      await reveiverUser.save()

      if (!sentUser.sent.find(mailId => mailId.toString() === id))
        await Message.findByIdAndDelete(id)
    }

    else {
      sentUser.sent = sentUser.sent.filter(mailId => mailId.toString() !== id)
      await sentUser.save()

      if (!reveiverUser.inbox.find(mailId => mailId.toString() === id))
        await Message.findByIdAndDelete(id)
    }

    return res.status(204).send('Deletion Successful')
  }
  catch (error) {
    next(error)
  }
})

messagesRouter.get('/unread', async (req, res, next) => {
  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const userWithMail = await User.findById(user.id).populate('inbox')

    let count = 0

    userWithMail.inbox.forEach(mail => {
      if (!mail.read)
        count++
    })

    return res.send({count})

  }
  catch (error) {
    next(error)
  }

})


module.exports = messagesRouter