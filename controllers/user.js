
const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    return res.status(201).send(savedUser)
  }
  catch (error) {
    next(error.message)
  }

})



module.exports = userRouter