const db = require('APP/db')
const Group = db.model('groups')
const User = db.model('users')
// console.dir(db)
const GroupUser = db.model('group_user')

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
          socket.join(group.id, err => {
            if (err) { throw err }
            socket.emit('joinGroupFromServer', group);
            GroupUser.create({user_id, group_id: group.id})
            User.findById(user_id)
            .then(user => {
              console.log("am i getting here????????????????????????????????", sockets.io.sockets.adapter.rooms[group.id].sockets)
              socket.broadcast.to(group.id).emit('add:user', {groupId: group.id, row: user, user_id})
            }) //was userId
          })
        })
      })


      socket.on('leaveGroup', ({group_id, user_id}) => {
        GroupUser.destroy({where: {group_id, user_id}})
		    .then(result => {
          socket.broadcast.to(group_id).emit('remove:user', {groupId: group_id, user_id})
          socket.leave(group_id, err => {
            if (err) { throw err }
            socket.emit('leaveGroupFromServer', group_id);
          })
        })
        .catch(err => console.log(err))
      })

      // socket.on('joinGroup', ({url, name, user_id}) => {
      //   Group.findOrCreate({where: {url, name}})
      //   .then(([group, created]) => {
      //     return new Promise((resolve, reject) => {
      //       socket.join(group.id, err => {
      //         if(err) { return reject(err); }
      //         resolve(group);
      //       })
      //     })
      //   })
      //   .then((group) => {
      //       socket.emit('joinGroup', group);
      //       GroupUser.create({user_id, group_id: group.id})
      //       return User.findById(user_id)
      //       .then(user => sockets.io.broadcast.in(group.id).emit('addUser', 
      //         {groupId: group.id, row: user, user_id})) //was userId
      //     })
      //   })
      // })

      socket.on('disconnect', () => {
        console.log("disconnected___", socket.id)
      })
    }) 
  },
  get: function() { return sockets; }
}