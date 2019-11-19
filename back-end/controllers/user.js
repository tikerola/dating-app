require('dotenv').config()
const userRouter = require('express').Router()
const User = require('../models/user')
const parser = require('../utils/cloudinary')()
const Profile = require('../models/profile')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.post('/signup', async (req, res, next) => {
  const { username, password, gender, age } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)


  const newProfile = new Profile({
    username,
    gender,
    age,
    image: { imageUrl: gender === 'male' ? 'https://image.flaticon.com/icons/svg/145/145867.svg' : 'https://image.flaticon.com/icons/svg/145/145852.svg' },
    profileText: 'Nothing to show just yet'
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

userRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({ username }).populate('profile').populate('favorites')
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
    id: user._id,
    username: user.username,
    gender: user.gender,
    age: user.age,
    profile: user.profile.toJSON(),
    inbox: user.inbox,
    sent: user.sent,
    token,
    favorites: user.favorites
  })
})

userRouter.post('/edit', async (req, res, next) => {
  const { profileText } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const profileToEdit = await Profile.findOne({ username: user.username })
    profileToEdit.profileText = profileText
    const editedProfile = await profileToEdit.save()

    return res.status(201).send(editedProfile)

  }
  catch (error) {
    next(error)
  }
})

userRouter.post('/image', parser.single("file"), async (req, res, next) => {

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const profileToUpdate = await Profile.findOne({ username: user.username })

    const image = {
      imageUrl: req.file.url,
      id: req.file.public_id
    }

    profileToUpdate.image = image
    await profileToUpdate.save()

    res.status(201).send(image)

  } catch (error) {
    next(error)
  }
})

userRouter.post('/addToFavorites', async (req, res, next) => {
  const { username, operation } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)
    
    if (!user)
      throw new Error('Unauthorized')

    const userWithFavorites = await User.findById(user.id)
    const profileToAddOrRemove = await Profile.findOne({ username })

    if (operation === 'add') {
      userWithFavorites.favorites = userWithFavorites.favorites.concat(profileToAddOrRemove._id)
    }

    else {
      userWithFavorites.favorites = userWithFavorites.favorites.filter(favProfile => favProfile.toString() !== profileToAddOrRemove._id.toString())
    }

    const savedUser = await userWithFavorites.save()
    return res.status(201).send({ operation, profile: profileToAddOrRemove })

  } catch (error) {
    next(error)
  }

})



module.exports = userRouter