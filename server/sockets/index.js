
let sockets = {};


module.exports = {
  set: function(server) {
    sockets.io = require('socket.io')(server);
    console.log("running set function")

    sockets.io.on('connection', socket => {
      console.log('connected_', socket.id);
      //sockets[socket.id] = socket
      // socket.join('whatever')

      // .post('/', (req, res, next) => {
        // Group.findOrCreate({where: {url: req.body.url, name: req.body.name}})
        // .then(([group, created]) => {
        //   GroupUser.create({user_id: req.body.userId, group_id: group.id})
        //   res.status(201).json(group);
        // })
        // .catch(next);
      // })

      socket.on('joinGroup', ({url, name, user_id}) => {
        Group.findOrCreate({where: {url, name}})
        .then(([group, created]) => {
          socket.join(group.id).emit('joinGroup', group);
          GroupUser.create({user_id, group_id: group.id})
          User.findById(user_id)
          .then(user => sockets.io.broadcast.in(group.id).emit('addUser', 
            {groupId: group.id, row: user, user_id})) //userId
        })
      }
      //remove hook emit, and client reject

      socket.on('disconnect', () => {
        console.log("disconnected___", socket.id)
      })
    }) 
  },
  get: function() { return sockets; }
}