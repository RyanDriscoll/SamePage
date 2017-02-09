'use strict'

const db = require('APP/db')
const Group = require('./group')
const {expect} = require('chai')

describe('Group', () => {
  before('wait for the db', () => db.didSync)

  describe('Group model tests', () => {
    it('checks if the url matches', () =>
      Group.create({ url: 'www.url.com' })
        .then(group => expect(group.url).to.equal('www.url.com')));

    it("checks if the url doesn't match", () =>
      Group.create({ url: 'www.url.com' })
        .then(group => expect(group.url).to.not.equal('not www.url.com')));

    it("checks if the url is valid", () =>
      Group.create({ url: 'not a url' })
        .then(group => console.log(group.url))
        .catch(err => expect(err).to.exist));
    it("checks if the url exists", () =>
      Group.create({ url: '' })
        .then(group => console.log(group.url))
        .catch(err => expect(err).to.exist));
  });
});
