var db = require('APP/db')

var seedUsers = () => db.Promise.map([
  {username: 'so many', email: 'god@example.com', password: '123'},
  {username: 'Barack Obama', email: 'barack@example.gov', password: '123'},
  {username: 'Alan', email: 'alan@bomberboy.com', password: '123'},
  {username: 'Ryan', email: 'ryan@awesomebeard.com', password: '123'},
  {username: 'Tom', email: 'tom@redis.com', password: '123'},
  {username: 'KD', email: 'kd@dijkstra.com', password: '123'},
], user => db.model('users').create(user))

var seedMessages = () => db.Promise.map([
  {content: 'What is up?', group_id: 3, user_id: 6},
  {content: 'Trump sucks', group_id: 2, user_id: 5},
  {content: 'Tell me about it!', group_id: 3, user_id: 4},
  {content: 'My ear hurts', group_id: 2, user_id: 3},
  {content: 'My goat is missing', group_id: 1, user_id: 2},
  {content: 'ur all dubmn!', group_id: 1, user_id: 1},
], message => db.model('messages').create(message))

var seedGroups = () => db.Promise.map([
  {url: 'www.google.com', circle_id: null},
  {url: 'www.github.com', circle_id: null},
  {url: 'www.fullstackacademy.com', circle_id: 1},
  {url: 'www.facebook.com', circle_id: null},
  {url: 'www.gmail.com', circle_id: null},
  {url: 'https://en.wikipedia.org/wiki/Sloth', circle_id: 2},
], group => db.model('groups').create(group))

var seedGroupUsers = () => db.Promise.map([
  {user_id: 1, group_id: 1},
  {user_id: 2, group_id: 1},
  {user_id: 4, group_id: 2},
  {user_id: 4, group_id: 3},
  {user_id: 5, group_id: 4},
  {user_id: 3, group_id: 5},
], groupuser => db.model('group_user').create(groupuser))

var seedCircles = () => db.Promise.map([
  {name: 'Fullstack', creator: 1},
  {name: 'Sloth Fanatics', creator: 1},
  {name: 'Javascript rulez', creator: 2}
], circle => db.model('circles').create(circle))

var seedCircleUsers = () => db.Promise.map([
  {user_id: 1, circle_id: 1},
  {user_id: 2, circle_id: 1},
  {user_id: 4, circle_id: 2},
  {user_id: 4, circle_id: 3},
  {user_id: 5, circle_id: 2},
  {user_id: 3, circle_id: 3},
  {user_id: 6, circle_id: 3},
], circleuser => db.model('circle_user').create(circleuser))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .then(seedCircles)
  .then(circles => console.log(`Seeded ${circles.length} circles OK`))
  .then(seedGroups)
  .then(groups => console.log(`Seeded ${groups.length} groups OK`))
  .then(seedMessages)
  .then(messages => console.log(`Seeded ${messages.length} messages OK`))
  .then(seedGroupUsers)
  .then(groupusers => console.log(`Seeded ${groupusers.length} groupusers OK`))
  .then(seedCircleUsers)
  .then(circleusers => console.log(`Seeded ${circleusers.length} circleusers OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
