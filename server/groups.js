'use strict'

const db = require('APP/db')
const Group = db.model('groups')

module.exports = require('express').Router()
	.get('/url/:url', (req, res, next) => 
		Group.findOne({ 
			where: {name: req.params.url, url: req.params.url},
			include:[User, Message]
		})
		.then(group => res.json(group))
		.catch(next))
	.get('/', (req, res, next) =>
		Group.findOne({
			where: {name: req.query.name, url: req.query.url},
			include: [User, Message]
		})
		.then(group => res.json(group))
		.catch(next))
	.get('/user/:id', (req, res, next) =>
		Group.findAll({
			include: [{model: User, where:{ id: req.params.id}}, Message]
		})
		.then(group => res.json(group))
		.catch(next))
	.post('/', (req, res, next) =>
		Group.create(req.body)
		.then(group => res.status(201).json(group))
		.catch(next))
	// .get('/:id', mustBeLoggedIn, (req, res, next) => 
	// 	Group.findById(req.params.id)
	// 	.then(group => res.json(group))
	// 	.catch(next)
	.put('/:id', (req, res, next) => 
		Group.update(req.body, {where:{id: req.params.id}})
		.then(groupArr => groupArr[1][0]) //class version of update return array of # of rows updated, and the array of modified arrays
		.then(group => res.json(group))
		.catch(next))

	
	