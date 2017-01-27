const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {username: 'coolguy85', email: 'god@example.com', password: '1234'},
  {username: 'Barack', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
