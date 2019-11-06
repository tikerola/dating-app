const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const handleError = require('./middlewares/handleError')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const messagesRouter = require('./controllers/messages')
const developerRouter = require('./controllers/developer')
const profilesRouter = require('./controllers/profiles')
const tokenFromHeaders = require('./middlewares/tokenFromHeaders')
const cors = require('cors')

app.use(cors())
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
app.use('/api/profiles', profilesRouter)
app.use('/developer', developerRouter)


app.use(handleError)


module.exports = app