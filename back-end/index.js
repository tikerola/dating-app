const config = require('./utils/config')
const app = require('./app')

let clients = []


const server = app.listen(config.PORT, () => console.log(`Server serving from port ${config.PORT}`))

const io = require('./socket/socket').init(server)
io.on('connection', socket => {
  //console.log('Client connected')
  clients[socket.id] = socket
  
  socket.on('disconnect', function (data) {
    //console.log(socket.id + " disconnected");
    delete clients[socket.id];
  });
})