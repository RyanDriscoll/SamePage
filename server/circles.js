'use strict'

const db = require('APP/db')
const Circle = db.model('circles')
const User = db.model('users')
const CircleUser = db.model('circle_user')


module.exports = require('express').Router()
	.get('/', (req, res, next) => {
		// console.log("above circleuser find all", req.query)
		CircleUser.findAll({where: {user_id: req.query.user_id}, 
			include: [{model: Circle}]
		})
		// Circle.findAll({where: {user_id: req.query.user_id}, include: [User]})
		.then(circles => {
			// console.log('circleUsers----->>>>', circles)
			res.json(circles)
		})
		.catch(next);
	})
