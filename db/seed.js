const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {id: 1, username: 'Alan', email: 'alan@fs.com', password: '123'},
  {id: 2, username: 'Ryan', email: 'ryan@fs.com', password: '123'},
  {id: 3, username: 'Tom', email: 'tom@fs.com', password: '123'},
  {id: 4, username: 'KD', email: 'kd@fs.com', password: '123'},
  {id: 5, username: 'Mike', email: 'mike@fs.com', password: '123'},
  {id: 6, username: 'Claire', email: 'claire@fs.com', password: '123'},
  {id: 7, username: 'Waseem', email: 'waseem@fs.com', password: '123'},
  {id: 8, username: 'Danielle', email: 'danielle@fs.com', password: '123'},
  {id: 9, username: 'Andy', email: 'andy@fs.com', password: '123'},
  {id: 10, username: 'Alexis', email: 'alexis@fs.com', password: '123'},
  {id: 11, username: 'Jean', email: 'jean@fs.com', password: '123'},
  {id: 12, username: 'Rebekah', email: 'rebekah@fs.com', password: '123'},
  {id: 13, username: 'Hal', email: 'hal@fs.com', password: '123'},
  {id: 14, username: 'Spencer', email: 'spencer@fs.com', password: '123'},
  {id: 15, username: 'Alvin', email: 'alvin@fs.com', password: '123'},
  {id: 16, username: 'Joe', email: 'joe@fs.com', password: '123'},
  {id: 17, username: 'Alex', email: 'alex@fs.com', password: '123'}
], user => db.model('users').create(user))

const seedCircles = () => db.Promise.map([
  {id: 1, name: 'Fullstack', creator: 2},
  {id: 2, name: 'Hatch', creator: 2},
  {id: 3, name: 'Drawsome', creator: 2},
  {id: 4, name: 'Notion', creator: 2}
], circle => db.model('circles').create(circle))

const seedCircleUsers = () => db.Promise.map([
  {user_id: 17, circle_id: 1},
  {user_id: 1, circle_id: 1},
  {user_id: 2, circle_id: 1},
  {user_id: 3, circle_id: 1},
  {user_id: 4, circle_id: 1},
  {user_id: 5, circle_id: 1},
  {user_id: 6, circle_id: 1},
  {user_id: 7, circle_id: 1},
  {user_id: 8, circle_id: 1},
  {user_id: 9, circle_id: 1},
  {user_id: 10, circle_id: 1},
  {user_id: 11, circle_id: 1},
  {user_id: 12, circle_id: 1},
  {user_id: 13, circle_id: 1},
  {user_id: 14, circle_id: 1},
  {user_id: 15, circle_id: 1},
  {user_id: 16, circle_id: 1},
  {user_id: 2, circle_id: 2},
  {user_id: 12, circle_id: 2},
  {user_id: 11, circle_id: 2},
  {user_id: 10, circle_id: 2},
  {user_id: 9, circle_id: 2},
  {user_id: 2, circle_id: 3},
  {user_id: 5, circle_id: 3},
  {user_id: 6, circle_id: 3},
  {user_id: 7, circle_id: 3},
  {user_id: 8, circle_id: 3},
  {user_id: 2, circle_id: 4},
  {user_id: 13, circle_id: 4},
  {user_id: 14, circle_id: 4},
  {user_id: 15, circle_id: 4},
  {user_id: 16, circle_id: 4},
], circleuser => db.model('circle_user').create(circleuser))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedCircles)
  .then(circles => console.log(`Seeded ${circles.length} circles OK`))
  .then(seedCircleUsers)
  .then(circleusers => console.log(`Seeded ${circleusers.length} circleusers OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
