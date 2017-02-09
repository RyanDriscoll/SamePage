const Sequelize = require('sequelize')
const db = require('APP/db')
const User = require('./user.js');

const circleUserSchema = {
  status: {
    type: Sequelize.ENUM('pending', 'active'),
    defaultValue: 'active'
  }
};

const circleUserConfig = {
  tableName: 'circle_user',
};

const CircleUser = db.define('circle_user', circleUserSchema, circleUserConfig);

module.exports = CircleUser;
