const Sequelize = require('sequelize');
const db = require('APP/db');

const circleSchema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creator: {
    type: Sequelize.STRING,
    defaultValue: 1
  }
};

const circleConfig = {};

const Circle = db.define('circles', circleSchema, circleConfig);

module.exports = Circle;
