const Sequelize = require('sequelize')
const db = require('APP/db')
const sockets = require('APP/server/sockets').get();

const messageSchema = {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}

const messageConfig = {
  tableName: 'messages',
  hooks: {
    beforeCreate(message) {
      sockets.io.emit('message:create', message);
    }
  }
}


const Message = db.define('messages', messageSchema, messageConfig);

module.exports = Message;