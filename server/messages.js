'use strict'

const db = require('APP/db')
const Message = db.model('messages')
const User = db.model('users')
const sockets = require('APP/server/sockets').get();


module.exports = require('express').Router()

  .get('/', (req, res, next) => {
    let groups = req.query.groups//.map( id => +id );
    Message.findAll({
      where: {group_id: {$in: groups}}, 
      include:[{model: User, attributes: ['username', 'id']}]
    })
    .then(messages => {
      res.status(201).json(messages)
    })
    .catch(next)
  })

  .post('/', (req, res, next) => {
    Message.create(req.body)
    .then(msg => {
      sockets.io.to(msg.group_id).emit("add:msg", {msg, groupId: msg.group_id});
      res.status(201).json(msg);
    })
    .catch(next);
  });
