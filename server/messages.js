'use strict'

const db = require('APP/db')
const Message = db.model('messages')

module.exports = require('express').Router()
	.post('/', (req, res, next) =>
		Messages.create(req.body)
		.then(message => res.status(201).json(message))
		.catch(next))

	