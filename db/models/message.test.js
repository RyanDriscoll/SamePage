'use strict'

const db = require('APP/db')
const Message = require('./message')
const {expect} = require('chai')

describe('Message', () => {
  before('wait for the db', () => db.didSync)

  describe('Message model tests', () => {
    it('creates a message if the message has content', () =>
      Message.create({ content: 'ok' })
        .then(result => expect(result.content).to.equal('ok')));

    it("returns and error if the content doesn't exist", () =>
      Message.create({ content: null })
        .then(result => console.log(result))
        .catch(err => expect(err).to.exist));
  });
});