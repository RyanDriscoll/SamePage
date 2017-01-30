const Sequelize = require('sequelize')
const db = require('APP/db')
const sockets = require('APP/server/sockets').get();

const groupUserSchema = {
  // name: {
  // 	type: Sequelize.STRING
  // }
}

const groupUserConfig = {
  tableName: 'group_user',
  hooks: {
    beforeCreate(group_user) 
      sockets.io.emit('create:group_user', group_user),
    beforeDestroy(group_user) 
      sockets.io.emit('delete:group_user', group_user),
    }
  }
}


const GroupUser = db.define('group_user', groupUserSchema, groupUserConfig);

module.exports = GroupUser;