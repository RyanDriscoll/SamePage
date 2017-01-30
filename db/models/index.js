'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Group = require('./group');
const Message = require('./message');
const OAuth = require('./oauth')
const GroupUser = require('./groupuser')

User.belongsToMany(Group, {through: GroupUser});
Group.belongsToMany(User, {through: GroupUser});

GroupUser.belongsTo(User)
User.hasMany(GroupUser)

GroupUser.belongsTo(Group)
Group.hasMany(GroupUser)

Group.hasMany(Message);
Message.belongsTo(Group);

User.hasMany(Message);
Message.belongsTo(User);

OAuth.belongsTo(User)
User.hasOne(OAuth)




module.exports = {User, Group, Message, GroupUser}
