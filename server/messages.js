'use strict'

const db = require('APP/db')
const Message = db.model('messages')
const User = db.model('users')

module.exports = require('express').Router()
	
	.get('/', (req, res, next) => {
		Message.findAll({where: req.query, include:[User]})
		.then(messages => res.status(201).json(messages))
		.catch(next)
	})

	// .get('/user/:id', (req, res, next) =>  //need both users
	// 	Message.findAll({where: req.qurey})
	// 	.then(message => res.status(201).json(message))
	// 	.catch(next))

	.post('/', (req, res, next) =>
		Message.create(req.body)
		.then(message => Message.findById(message.id, {include:[User]}))
		.then(messageWuser => {console.log("messageWuser", messageWuser);res.status(201).json(messageWuser)})
		.catch(next))

	