const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  profileText: {
    type: String
  },
  image: {
    type: String,
    default: 'https://image.flaticon.com/icons/svg/145/145852.svg'
  }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile