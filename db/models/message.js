const Sequelize = require('sequelize')
const db = require('APP/db')
// const sockets = require('APP/server/sockets');

const messageSchema = {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}

const messageConfig = {
  tableName: 'messages',
  // hooks: {
  //   afterCreate(message) {
  //     console.log("add msg", message)
  //     sockets.io.emit('add:msg', message);
  //   }
  // }
}


const Message = db.define('messages', messageSchema, messageConfig);

module.exports = Message;