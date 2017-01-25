'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Group = require('./group');
const Message = require('./message');

User.belongsToMany(Group, {through: 'group_user'});
Group.belongsToMany(User, {through: 'group_user'});

Group.hasMany(Message);
Message.belongsTo(Group);

User.hasMany(Message);
Message.belongsTo(User);




module.exports = {User, Group, Message}
