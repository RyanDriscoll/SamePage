
let sockets = {};


module.exports = {
  set: function(server) {
    sockets.io = require('socket.io')(server);
    console.log("running set function")

    sockets.io.on('connection', socket => {
      console.log('connected_', socket.id);
      //sockets[socket.id] = socket
      // socket.join('whatever')

      socket.on('disconnect', () => {
        console.log("disconnected___", socket.id)
      })
    }) 
  },
  get: function() { return sockets; }
}