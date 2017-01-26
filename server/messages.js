'use strict'

const db = require('APP/db')
const Message = db.model('messages')

module.exports = require('express').Router()
	
	.get('/', (req, res, next) => 
		Messages.findAll({where: req.query})
		.then(message => res.status(201).json(message))
		.catch(next))

	// .get('/user/:id', (req, res, next) =>  //need both users
	// 	Messages.findAll({where: req.qurey})
	// 	.then(message => res.status(201).json(message))
	// 	.catch(next))

	.post('/', (req, res, next) =>
		Messages.create(req.body)
		.then(message => res.status(201).json(message))
		.catch(next))

	