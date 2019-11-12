require('dotenv').config()
const profilesRouter = require('express').Router()
const Profile = require('../models/profile')
const jwt = require('jsonwebtoken')


profilesRouter.post('/search', async (req, res, next) => {
  const { age, gender, page = 1, limit = 12 } = req.body

  let count = -1


  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    if (page === 1)
      count = await Profile.find({
        age: {$gte: age[0], $lte: age[1]},
        gender: gender
      })
      .countDocuments()

    const profiles = await Profile.find({
      age: {$gte: age[0], $lte: age[1]},
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





module.exports = profilesRouter