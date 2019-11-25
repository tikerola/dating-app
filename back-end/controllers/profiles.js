require('dotenv').config()
const profilesRouter = require('express').Router()
const Profile = require('../models/profile')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


profilesRouter.post('/search', async (req, res, next) => {
  const { age, gender, page = 1, limit = 12 } = req.body

  let count = -1


  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const userWhoSeaches = await User.findById(user.id)
    const dontSearch = [user.username, ...userWhoSeaches.blockedBy]

    if (page === 1)
      count = await Profile.find({
        age: { $gte: age[0], $lte: age[1] },
        username: { $nin: dontSearch },
        gender: gender
      })
        .countDocuments()

    const profiles = await Profile.find({
      age: { $gte: age[0], $lte: age[1] },
      username: { $nin: dontSearch },
      gender: gender
    })
      .sort({ username: 1 })
      .skip((page - 1) * limit)
      .limit(limit)


    return res.status(200).send({ profiles, count })
  }
  catch (error) {
    next(error)
  }
})

profilesRouter.post('/searchOne', async (req, res, next) => {
  const { username } = req.body
  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const userWhoSeaches = await User.findById(user.id)
    const dontSearch = [user.username, ...userWhoSeaches.blockedBy]

    const profile = await Profile.findOne({ $and: [{ username }, { username: { $nin: dontSearch } }] })

    if (!profile) {
      throw new Error('No such username')
    }

    return res.send(profile)

  }
  catch (error) {
    next(error)
  }
})




module.exports = profilesRouter