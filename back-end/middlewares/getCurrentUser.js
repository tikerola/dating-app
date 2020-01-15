
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  req.currentUser = jwt.verify(req.token, process.env.JWT_SECRET)

  if (!req.currentUser)
    throw new Error('Unauthorized')

  next()
}