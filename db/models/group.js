const Sequelize = require('sequelize')
const db = require('APP/db')

const groupSchema = {
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    allowNull: false
  },
  name: {
  	type: Sequelize.STRING
  }
}

const groupConfig = {
  tableName: 'groups'
}



const Group = db.define('groups', groupSchema, groupConfig);

module.exports = Group;