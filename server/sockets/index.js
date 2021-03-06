const db = require('APP/db')
const Group = db.model('groups')
const User = db.model('users')
const GroupUser = db.model('group_user')

let sockets = {};


module.exports = {
  set: function(server) {
    sockets.io = require('socket.io')(server);

    sockets.io.on('connection', socket => {

      socket.on('typing', ({username, group}) => {
        socket.broadcast.to(group).emit('typing', {username, group})
      })

      socket.on('doneTyping', ({username, group}) => {
        socket.broadcast.to(group).emit('doneTyping', {username, group})
      })

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

      socket.on('leaveAllGroups', ({groupIds, user_id}) => {
        GroupUser.destroy({where: {user_id}})
        .then(result => {
          groupIds.forEach(id=> {
            socket.broadcast.to(id).emit('remove:user', {groupId: id, user_id})
            socket.leave(id, err => { if (err) throw err })
          })
          socket.emit('logoutFromServer');
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
              if (err) throw err
              socket.emit('closeTabFromServer', tabId);
            })
          })
          .catch(err => console.log(err))
        }
      })

      socket.on('joinGroup', ({url, user_id, circleIds}) => {
        circleIds.push(null);
        Group.findAll({where: {url:url, circle_id: {$or: [{$eq: null}, {$in:circleIds}]} }})
        .then(groups => {
          if(groups.length !== circleIds.length){
            let foundIds = groups.map(group=> group.circle_id && ""+group.circle_id)
            // let unfoundIds = circleIds.filter(id => foundIds.indexOf(id ? +id : null) == -1).map( id => id ? +id : null)
            // let toCreate = unfoundIds.map(circle_id => ({circle_id, url}))
            let toCreate = circleIds.filter(id => foundIds.indexOf(id) == -1)
                                    .map(circle_id => ({url, circle_id}))
            return Group.bulkCreate(toCreate, {returning: true})
            .then(newGroups => {
              groups.push(...newGroups)
              return groups
            })
          }else return groups
        })
        .then(allGroups => {
          allGroups.forEach(group=>{
            socket.join(group.id, err => {
              if (err) throw err
              GroupUser.findOrCreate({where:{user_id: user_id, group_id: group.id}})
              .then(()=> {
                return User.findById(user_id)
              })
              .then(user=>
                socket.broadcast.to(group.id).emit('add:user', {groupId: group.id, user, user_id})
              )
              .catch(err=>console.log("error in joinGroup socket.on", err, err.stack))
            })
          })
          return allGroups;
        })
        .then(allGroups => socket.emit('joinGroupFromServer', allGroups))
        .catch(err=>console.log("error in joinGroup socket.on", err, err.stack))
      })

      socket.on('disconnect', () => {
        console.log("disconnected___", socket.id)
      })
    })
  },
  get: function() { return sockets; }
}
