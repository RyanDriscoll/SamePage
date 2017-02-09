const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Message = db.model('messages')
const Group = db.model('groups')
const app = require('./start')

describe('/api/messages', () => {
  let groupNum;
  before('create a message', (done) => {
    db.didSync
      .then(() => {
        return Group.create({
          url: 'www.whatever.com'
        })
        .then(response => {
          groupNum = response.id;
          return Message.create({
            content: 'this is content',
            user_id: 1,
            group_id: response.id
          })
        })
      })
      .then(() => done())
  })
  describe('api/messages', () => {
    it('gets a message', () =>
      request(app)
        .get(`/api/messages`)
        .query({groupId: groupNum})
        .then(response => {
          expect(response.body[0].content).to.equal('this is content')})
    );
  });
});