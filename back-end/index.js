const config = require('./utils/config')
const app = require('./app')
const clients = require('./utils/clients')



const server = app.listen(config.PORT, () => console.log(`Server serving from port ${config.PORT}`))

const io = require('./socket/socket').init(server)
io.on('connection', socket => {

  socket.on('newUser', username => {
    console.log(socket.id)
    if (username !== null)
      clients[username] = socket.id
  })

  socket.on('chat', data => {
    
    const id = clients[data.to]
    io.to(`${id}`).emit('chat', data)
  })
  
  socket.on('disconnect', function (data) {
    
    for (key in clients) {
      if (clients[key] === socket.id) {
        delete clients[key]
      }
    }
   
  })
})

