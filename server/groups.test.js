const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Group = require('APP/db/models/group')
const app = require('./start')

describe('/api/groups', () => {
  before('groups', () =>
    db.didSync
      .then(() => {
        Group.destroy({where: {url: 'www.url.com'}});
      })
      .catch(err => console.error('line 13 groups.test.js', err, err.stack))
  );
  describe('create a group', () => {
    it('creates a group', () =>
      request(app)
        .post(`/api/groups`)
        .send({
          url: 'www.url.com',
          name: 'www.url.com',
          userId: 1
        })
        .then(response => {
          expect(response.body.url).to.equal('www.url.com');
        })
    );

    it('returns a group', () =>
      request(app)
        .post(`/api/groups`)
        .send({
          url: 'www.url.com',
          name: 'www.url.com',
          userId: 1
        })
        .then(() => {
          request(app)
          .get('/api/groups')
          .query({
            url: 'www.url.com',
            name: 'www.url.com'
          })
          .then(response => {
            expect(response.body.url).to.equal('www.url.com')})
        })
        .catch(err => console.error(err, err.stack))
    );
  });
});