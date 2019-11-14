
const chatRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const io = require('../socket/socket')

chatRouter.post('/', (req, res, next) => {

  try {
    
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    
    io.getIo().emit('chat', { message: req.body })
    return res.send(req.body)

  }
  catch (error) {
    next(error)
  }
})



module.exports = chatRouter