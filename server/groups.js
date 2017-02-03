'use strict'

const db = require('APP/db')
const Group = db.model('groups')
const GroupUser = db.model('group_user')
const User = db.model('users')
const sockets = require('APP/server/sockets').get();


module.exports = require('express').Router()
	// .get('/url/:url', (req, res, next) =>
	// 	Group.findOne({
	// 		where: {name: req.params.url, url: req.params.url},
	// 		include:[User, Message]
	// 	})
	// 	.then(group => res.json(group))
	// 	.catch(next))
	.get('/', (req, res, next) =>
		Group.findOne({
			where: {name: req.query.name, url: req.query.url},
		})
		.then(group => res.json(group))
		.catch(next))

	.get('/group_users', (req, res, next) => {
		GroupUser.findAll({where: {group_id: req.query.groupId}, include: [User]})
		.then(groupUsers => {
			res.json(groupUsers);
		})
		.catch(next);
	})

	.get('/:id', (req, res, next) =>
		Group.findById(req.params.id)
		.then(group => res.json(group))
		.catch(next))

	.get('/user/:userId', (req, res, next) =>
		User.findById(req.params.userId).getGroups()
		.then(groups => res.json(groups))
		.catch(next))

	.post('/', (req, res, next) => {
		Group.findOrCreate({where: {url: req.body.url, name: req.body.name}})
		.then(([group, created]) => {
			GroupUser.create({user_id: req.body.userId, group_id: group.id})
			res.status(201).json(group);
		})
		.catch(next);
	})

	.delete('/:groupId', (req, res, next) => {
		let groupId = req.params.groupId;
		Group.destroy({where: {id: groupId}})
		.then(() => {
			res.sendStatus(200)
		})
		.catch(next)
	})

	.delete('/users', (req, res, next) => {
		GroupUser.destroy({where: {group_id: req.body.groupId, user_id: req.body.userId}})
		.then(result => res.send(result))
		.catch(err => console.log(err))
	})
	// .get('/:id', mustBeLoggedIn, (req, res, next) =>
	// 	Group.findById(req.params.id)
	// 	.then(group => res.json(group))
	// 	.catch(next)
	.put('/:id', (req, res, next) =>
		Group.update(req.body, {where:{id: req.params.id}})
		.then(groupArr => groupArr[1][0]) //class version of update return array of # of rows updated, and the array of modified arrays
		.then(group => res.json(group))
		.catch(next))


