'use strict'

const db = require('APP/db')
const Circle = db.model('circles')
const User = db.model('users')
const CircleUser = db.model('circle_user')


module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    CircleUser.findAll({where: {user_id: req.query.user_id}, include: [Circle]})
    .then(circles => res.json(circles))
    .catch(next);
  })
