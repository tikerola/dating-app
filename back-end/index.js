const config = require('./utils/config')
const app  = require('./app')


const server = app.listen(config.PORT, () => console.log(`Server serving from port ${config.PORT}`))
const io = require('./socket/socket').init(server)
io.on('connection', socket => {
  console.log('Client connected')
})