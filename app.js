const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const handleError = require('./middlewares/handleError')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const messagesRouter = require('./controllers/messages')
const tokenFromHeaders = require('./middlewares/tokenFromHeaders')

app.use(express.json())


mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => handleError(error))


app.use('/api/signup', userRouter)
app.use('/api/login', loginRouter)
app.use(tokenFromHeaders)
app.use('/api/messages', messagesRouter)


app.use(handleError)


module.exports = app