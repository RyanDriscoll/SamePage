let sockets = {};


module.exports = {
  set(server) {
    sockets.io = require('socket.io')(server);
    // spelling?
    // sockets.io.on('connection', socket => {
    //   console.log('connected', socket.id);
    //   socket.join('whatever')
    // }) 
  },
  get() { return sockets; }
}