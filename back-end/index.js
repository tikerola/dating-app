const config = require('./utils/config')
const app = require('./app')
const clients = require('./utils/clients')
const Profile = require('./models/profile')


const server = app.listen(config.PORT, () => console.log(`Server serving from port ${config.PORT}`))

const io = require('./socket/socket').init(server)
io.on('connection', socket => {

  socket.on('newUser', username => {
    if (username !== null)
      clients[username] = socket.id
  })

  socket.on('chat', data => {
    
    const id = clients[data.to]
    io.to(`${id}`).emit('chat', data)
  })

  
  socket.on('disconnect', async data => {
    
    for (key in clients) {
      if (clients[key] === socket.id) {
        const profile = await Profile.findOne({ username: key })
        profile.online = false
        await profile.save()
        delete clients[key]
      }
    }
  })
})

