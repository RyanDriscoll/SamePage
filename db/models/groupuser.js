const Sequelize = require('sequelize')
const db = require('APP/db')
const sockets = require('APP/server/sockets').get();
const User = require('./user.js');

const groupUserSchema = {
  // name: {
  // 	type: Sequelize.STRING
  // }
}

const groupUserConfig = {
  tableName: 'group_user',
  hooks: {
    afterCreate(group_user){
        console.log('in the add user socket')
      User.findById(group_user.user_id)
      .then(user => {
        sockets.io.emit('add:user', {groupId: group_user.group_id, row: user, userId: user.id});
      })
      .catch(err => console.error(err, err.stack))
    }
  }
}



const GroupUser = db.define('group_user', groupUserSchema, groupUserConfig);

module.exports = GroupUser;
