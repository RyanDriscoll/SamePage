const Sequelize = require('sequelize')
const db = require('APP/db')

const roomSchema = {
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    allowNull: false
  }
}

const roomConfig = {
  tableName: 'rooms'
}



const Room = db.define('rooms', roomSchema, roomConfig);

module.exports = Room;