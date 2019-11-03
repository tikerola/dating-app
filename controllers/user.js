
const userRouter = require('express').Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res, next) => {
  const { username, password, gender, age } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newProfile = new Profile({
    username,
    gender,
    age,
    image: gender === 'male' ? 'https://image.flaticon.com/icons/svg/145/145867.svg' : 'https://image.flaticon.com/icons/svg/145/145852.svg'
  })

  try {

    const createdProfile = await newProfile.save()

    const newUser = new User({
      username,
      passwordHash,
      gender,
      age,
      profile: createdProfile._id
    })

    const savedUser = await newUser.save()
    return res.status(201).send(savedUser)
  }
  catch (error) {
    next(error)
  }

})



module.exports = userRouter