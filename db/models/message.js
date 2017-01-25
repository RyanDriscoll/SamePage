const Sequelize = require('sequelize')
const db = require('APP/db')

const messageSchema = {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}

const messageConfig = {
  tableName: 'messages'
}


const Message = db.define('messages', messageSchema, messageConfig);

module.exports = Message;