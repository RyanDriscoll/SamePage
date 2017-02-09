'use strict'

const db = require('APP/db')
const Message = db.model('messages')
const User = db.model('users')
const sockets = require('APP/server/sockets').get();


module.exports = require('express').Router()

	.get('/', (req, res, next) => {
		Message.findAll({where: {group_id: req.query.groupId}, include:[{model: User, attributes: ['username', 'id']}]})
		.then(messages => {
			res.status(200).json(messages)
		})
		.catch(next);
	})

	// .get('/user/:id', (req, res, next) =>  //need both users
	// 	Message.findAll({where: req.qurey})
	// 	.then(message => res.status(201).json(message))
	// 	.catch(next))

	.post('/', (req, res, next) => {
		console.log('**********', req.body)
		Message.create(req.body)
		.then(message => {
			sockets.io.to(message.group_id).emit("add:msg", {row: message, groupId: message.group_id});
			res.status(201).json(message);
		})
		.catch(next);
	});
