const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const app = require('./start')

const alice = {
  email: 'alice@secrets.org',
  username: 'alice',
  password: '12345'
}

describe('/api/auth', () => {
  before('create a user', () =>
    db.didSync
      .then(() => {
        User.destroy({where: {email: alice.email}});
      })
      .then(() => {
        User.create(
          {email: alice.email,
          username: alice.username,
          password: alice.password
        })
        .catch(err => console.error('line 22 auth.test.js', err, err.stack))
      }
    )
  )

  describe('POST /login (username, password)', () => {
    it('succeeds with a valid username and password', () =>
      request(app)
        .post('/api/auth/login')
        .send(alice)
        .expect(302)
        .expect('Set-Cookie', /session=.*/)
      )

    it('fails with an invalid username and password', () =>
      request(app)
        .post('/api/auth/login')
        .send({username: alice.username, password: 'wrong'})
        .expect(302)
      )
  })

  describe('GET /whoami', () => {
    describe('when logged in,', () => {
      const agent = request.agent(app)
      before('log in', () => {
        return agent
        .post('/api/auth/login')
        .send(alice)
      })

      it('responds with the currently logged in user', () =>
        agent.get('/api/auth/whoami')
          .set('Accept', 'application/json')
          .expect(200)
          .then(res => expect(res.body).to.contain({
            email: alice.email
          }))
      )
    })

    it('when not logged in, responds with an empty object', () =>
      request(app).get('/api/auth/whoami')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({})
        })
    )
  })

  describe('POST /logout when logged in', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/login')
      .send(alice))

    it('logs you out and redirects to whoami', () => agent
      .get('/api/auth/whoami')
      .expect(200)
      .then(res => expect(res.body).to.contain({
        email: alice.email
      }))
      .then(() => {
        agent
        .post('/api/auth/logout')
        .then(() => {
          agent.get('/api/auth/whoami')
            .expect(200)
            .then(rsp => expect(rsp.body).eql({}))
        })
      })
    )
  })
})