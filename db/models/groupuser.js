const Sequelize = require('sequelize')
const db = require('APP/db')

const groupUserSchema = {
}

const groupUserConfig = {
  tableName: 'group_user',
}



const GroupUser = db.define('group_user', groupUserSchema, groupUserConfig);

module.exports = GroupUser;
