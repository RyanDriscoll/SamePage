'use strict'

const db = require('APP/db')
const Group = db.model('groups')

module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Group.findAll({ 
			where: {name: req.query.url, url: req.query.url},
			include:[User, Message]
		})
		.then(groups => res.json(groups))
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

	
	