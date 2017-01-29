const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {username: 'so many', email: 'god@example.com', password: '1234'},
  {username: 'Barack Obama', email: 'barack@example.gov', password: '1243'},
  {username: 'Alan', email: 'alan@bomberboy.com', password: '1423'},
  {username: 'Ryan', email: 'ryan@awesomebeard.com', password: '4123'},
  {username: 'Tom', email: 'tom@redis.com', password: '4132'},
  {username: 'KD', email: 'kd@dijkstra.com', password: '4312'},
], user => db.model('users').create(user))

const seedMessages = () => db.Promise.map([
  {content: 'What is up?', group_id: '3', user_id: '6'},
  {content: 'Trump sucks', group_id: '2', user_id: '5'},
  {content: 'Tell me about it!', group_id: '3', user_id: '4'},
  {content: 'My ear hurts', group_id: '2', user_id: '3'},
  {content: 'My goat is missing', group_id: '1', user_id: '2'},
  {content: 'ur all dubmn!', group_id: '1', user_id: '1'},
], message => db.model('messages').create(message))

const seedGroups = () => db.Promise.map([
  {url: 'www.google.com', name: 'www.google.com'},
  {url: 'www.github.com', name: 'null'},
  {url: 'www.fullstackacademy.com', name: '1610-FSA-CH-SR'},
  {url: 'www.facebook.com', name: 'www.facebook.com'},
  {url: 'www.gmail.com', name: 'www.gmail.com'},
  {url: 'https://en.wikipedia.org/wiki/Binary_search_tree', name: 'math-geeks'},
], group => db.model('groups').create(group))

const seedGroupUsers = () => db.Promise.map([
  {user_id: '1', group_id: '1'},
  {user_id: '2', group_id: '1'},
  {user_id: '4', group_id: '2'},
  {user_id: '4', group_id: '3'},
  {user_id: '5', group_id: '4'},
  {user_id: '3', group_id: '5'},
], groupuser => db.model('group_user').create(groupuser))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .then(seedGroups)
  .then(groups => console.log(`Seeded ${groups.length} groups OK`))
  .then(seedMessages)
  .then(messages => console.log(`Seeded ${messages.length} messages OK`))
  .then(seedGroupUsers)
  .then(groupusers => console.log(`Seeded ${groupusers.length} groupusers OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
