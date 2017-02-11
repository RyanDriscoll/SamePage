'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Group = require('./group');
const Message = require('./message');
const OAuth = require('./oauth');
const GroupUser = require('./groupuser');
const Circle = require('./circle');
const CircleUser = require('./circleuser');

User.belongsToMany(Group, {through: GroupUser});
Group.belongsToMany(User, {through: GroupUser});

GroupUser.belongsTo(User);
User.hasMany(GroupUser);

GroupUser.belongsTo(Group);
Group.hasMany(GroupUser);

Group.hasMany(Message);
Message.belongsTo(Group);

User.hasMany(Message);
Message.belongsTo(User);

OAuth.belongsTo(User);
User.hasOne(OAuth);

Circle.hasOne(Group);
Group.belongsTo(Circle);

User.belongsToMany(Circle, {through: CircleUser});
Circle.belongsToMany(User, {through: CircleUser});

CircleUser.belongsTo(User);
User.hasMany(CircleUser);

CircleUser.belongsTo(Circle);
Circle.hasMany(CircleUser);

module.exports = {User, Group, Message, GroupUser, Circle};
