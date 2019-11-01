require('dotenv').config()
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const match = await bcrypt.compare(password, user.passwordHash)
  

  if (!user || !match) {
    return res.status(401).send('Unauthorized user')
  }

  const userForToken = {
    username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET)

  res.status(200).send({
    username,
    id: userForToken.id,
    token
  })
})



module.exports = loginRouter