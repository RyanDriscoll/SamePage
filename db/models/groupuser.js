const Sequelize = require('sequelize')
const db = require('APP/db')

const groupUserSchema = {
  
}

const groupUserConfig = {
  tableName: 'group_user',
  hooks: {
    afterCreate(groupUser) {
      sockets.io.emit('create:group_user', groupUser);
    }
  }
}



const GroupUser = db.define('group_user', groupUserSchema, groupUserConfig);

module.exports = GroupUser;