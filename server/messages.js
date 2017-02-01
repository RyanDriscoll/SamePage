'use strict'

const db = require('APP/db')
const Message = db.model('messages')
const User = db.model('users')
const sockets = require('APP/server/sockets').get();


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
		.then(messageWuser => {
			console.log("messageWuser", req.body.tabId)
			messageWuser.dataValues.tabId = req.body.tabId
			sockets.io.emit("add:msg", messageWuser)
			res.status(201).json(messageWuser)
		})
		.catch(next))

	