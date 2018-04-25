const http = require('http')
const socketIo = require('socket.io')

module.exports = function () {
  const server = http.createServer(this.nuxt.renderer.app)
  const io = socketIo(server)

  // overwrite nuxt.listen().
  this.nuxt.listen = (port, host) => {
    return new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
  }

  // Add `socket.io-client` in vendor.
  this.addVendor('socket.io-client')

  io.on('connection', socket => {
    socket.on('ship', data => {
      data.id = socket.id
      socket.broadcast.emit('ship', data)
    })
    socket.on('blast', data => {
      data.id = `${socket.id}_${data.id}`
      socket.broadcast.emit('blast', data)
    })
    socket.on('disconnect', data => {
      socket.broadcast.emit('kill', socket.id)
    })
  })
}
