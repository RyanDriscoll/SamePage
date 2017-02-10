const db = require('APP/db')
const Group = db.model('groups')
const User = db.model('users')
// console.dir(db)
const GroupUser = db.model('group_user')

let sockets = {};


module.exports = {
  set: function(server) {
    sockets.io = require('socket.io')(server);

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

      socket.on('joinGroup', ({url, user_id, circleIds}) => {
        Group.findAll({where: {url:url, circleId: {$in:circleIds}})
        .then(groups => {
          if(groups.length != circleIds.length){
            let foundIds = groups.map(group=>group.circle_id)
            let unFoundIds = circleIds.filter(id => existingCircleIds.indexOf(id)==-1)
            return Group.bulkCreate(unFoundIds.map(circle_id => ({circle_id, url})))
            .then(newGroups => {
              groups.push(...newGroups)
              return groups
            })
          }else return groups
        })
        .then(allGroups => {
          allGroups.forEach(group=>{
            socket.join(group.id, err => {
              if (err) {throw err}
              socket.emit('joinGroupFromServer', group)
              GroupUser.findOrCreate({where:{user_id: user_id, group_id: group.id}})
              .catch(err=>console.log("error in joinGroup socket.on", err))
              User.findById(user_id)
              .then(user=>{
                socket.broadcast.to(group.id).emit('add:user', {groupId: group.id, row:user, user_id})
              })
            })
          })
          .catch(err=>console.log("error in joinGroup socket.on", err, err.stack))
        })
        



      //   Group.findOrCreate({where: {url, name}})
      //   .then(([group, created]) => {
      //     socket.join(group.id, err => {
      //       if (err) { throw err }
      //       socket.emit('joinGroupFromServer', group);
      //       GroupUser.findOrCreate({where: {user_id: user_id, group_id: group.id}})
      //       .catch(err => console.log("error in joinGroup socket.on", err))
      //       User.findById(user_id)
      //       .then(user => {
      //         socket.broadcast.to(group.id).emit('add:user', {groupId: group.id, row: user, user_id})
      //       })
      //     })
      //   })
      //   .catch(err => console.log("error in joinGroup socket.on", err, err.stack))
      // })


      socket.on('leaveGroup', ({group_id, user_id, tabId}) => {
        GroupUser.destroy({where: {group_id, user_id}})
		    .then(result => {
          socket.broadcast.to(group_id).emit('remove:user', {groupId: group_id, user_id})
          socket.leave(group_id, err => {
            if (err) { throw err }
            socket.emit('leaveGroupFromServer', group_id, tabId);
          })
        })
        .catch(err => console.log(err))
      })

      socket.on('closeTab', ({group_id, user_id, tabId, removeGroup}) => {
        if(!removeGroup){
          socket.emit('closeTabFromServer', tabId);       
        }else {
          GroupUser.destroy({where: {group_id, user_id}})
          .then(result => {
            socket.broadcast.to(group_id).emit('remove:user', {groupId: group_id, user_id})
            socket.leave(group_id, err => {
              if (err) { throw err }
              socket.emit('closeTabFromServer', group_id, tabId);
            })
          })
          .catch(err => console.log(err))
        }
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