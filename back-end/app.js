const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const handleError = require('./middlewares/handleError')
const userRouter = require('./controllers/user')
const messagesRouter = require('./controllers/messages')
const developerRouter = require('./controllers/developer')
const profilesRouter = require('./controllers/profiles')
const chatRouter = require('./controllers/chat')
const tokenFromHeaders = require('./middlewares/tokenFromHeaders')
const cors = require('cors')



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => handleError(error))

app.use(tokenFromHeaders)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/profiles', profilesRouter)
app.use('/developer', developerRouter)


app.use(handleError)


module.exports = app