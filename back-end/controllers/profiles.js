require('dotenv').config()
const profilesRouter = require('express').Router()
const Profile = require('../models/profile')
const jwt = require('jsonwebtoken')


profilesRouter.post('/search', async (req, res, next) => {
  const { age, gender, page = 0, limit = 12 } = req.body


  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const profiles = await Profile.find({
      age: {$gte: age[0], $lte: age[1]},
      gender: gender
    })
    .sort({ username: 1 })
    .skip(page * limit)
    .limit(limit)


    return res.status(200).send(profiles)
  }
  catch (error) {
    next(error)
  }

 
})



module.exports = profilesRouter