'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Room = require('./room');
const Message = require('./message');

User.hasMany(Room, {through: 'room_user'});
Room.hasMany(User, {through: 'room_user'});

Room.hasMany(Message);
Message.belongsTo(Room);

User.hasMany(Message);
Message.belongsTo(User);




module.exports = {User, Room, Message}
