let sockets = {};


module.exports = {
  set: function(server) {
    let io = require('socket.io')(server);
    console.log("running set function")

    io.on('connect', socket => {
      console.log('connected_', socket.id);
      // socket.join('whatever')
      socket.on('disconnect', () => {
        console.log("disconnected___", socket.id)
      })
    }) 
  },
  get: function() { return sockets; }
}