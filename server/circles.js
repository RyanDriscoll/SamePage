'use strict'

const db = require('APP/db')
const Circle = db.model('circles')
const User = db.model('users')


module.exports = require('express').Router()
	.get('/', (req, res, next) => {
		Circle.findAll({where: {user_id: req.query.user_id}, include: [User]})
		.then(circles => res.json(circles))
		.catch(next);
	})
