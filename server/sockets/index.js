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
        circleIds = circleIds.filter( id => id != 0);
        Group.findAll({where: {url:url, circle_id: {$or: [{$eq: null}, {$in:circleIds}]} }})
        .then(groups => {
          // console.log("------->>>>>after .then", groups.length, circleIds.length, "\n")
          if(groups.length !== circleIds.length){
            let foundIds = groups.map(group=> group.circle_id)
            let unFoundIds = circleIds.filter(id => foundIds.indexOf(id) == -1).map( id => id ? +id : null)
            let bulkCreate = unFoundIds.map(circle_id => ({circle_id, url}))
            // console.log("bulk create -------------------------------------------------\n", unFoundIds, foundIds)
            return Group.bulkCreate(bulkCreate, {returning: true})
            .then(newGroups => {
              // console.log("----->>>>>> inside bulk create", newGroups)
              groups.push(...newGroups)
              return groups
            })
          }else return groups
        })
        .then(allGroups => {
          // console.log("-----------after bulk create", allGroups)
          allGroups.forEach(group=>{
            // console.log("socket join group")
            socket.join(group.id, err => {
              if (err) {throw err}
              // console.log("inside socket.join--------------------\n")
              GroupUser.findOrCreate({where:{user_id: user_id, group_id: group.id}})
              .then(()=> {
                // console.log("inside .then after groupuser find or create -----------\n")
                if(!group.circle_id) socket.emit('joinGroupFromServer', allGroups)
                return User.findById(user_id)
              }) //dumb, send the username from client to avoid this db call
              .then(user=>
                socket.broadcast.to(group.id).emit('add:user', {groupId: group.id, row:user, user_id})
              )
              .catch(err=>console.log("error in joinGroup socket.on", err, err.stack))
            })
          })
        })
          .catch(err=>console.log("error in joinGroup socket.on", err, err.stack))
        



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
    }) 
  },
  get: function() { return sockets; }
}
