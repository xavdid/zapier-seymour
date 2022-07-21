/* globals describe it */

const should = require('should')

const zapier = require('zapier-platform-core')
const TEST_CHANNEL = 'C6RBZ562Z'

const App = require('../index')
const appTester = zapier.createAppTester(App)
zapier.tools.env.inject('.env')

describe('My App', () => {
  describe('loading chanels', () => {
    it('should load channels', (done) => {
      appTester(App.triggers.channel.operation.perform, {
        authData: { api_key: process.env.API_KEY },
      })
        .then((results) => {
          results.length.should.be.aboveOrEqual(3)
          done()
        })
        .catch(done)
    })
  })

  describe('Posting Items', () => {
    it('should send data', (done) => {
      appTester(App.creates.item.operation.perform, {
        authData: { api_key: process.env.API_KEY },
        inputData: {
          url: 'https://www.macstories.net/linked/microsoft-outlook-for-mac-undergoing-major-redesign/',
          channel: TEST_CHANNEL,
        },
      })
        .then((results) => {
          should.exist(results.attachments)
          done()
        })
        .catch(done)
    })

    it('should send re-parsed data', (done) => {
      appTester(App.creates.item.operation.perform, {
        authData: { api_key: process.env.API_KEY },
        inputData: {
          url: 'https://www.factorio.com/blog/post/fff-212',
          channel: TEST_CHANNEL,
          re_parse: true,
        },
      })
        .then((results) => {
          should.exist(results.attachments)
          should(results.attachments.length).equal(2)
          done()
        })
        .catch(done)
    })

    it('should use an identifier', (done) => {
      appTester(App.creates.item.operation.perform, {
        authData: { api_key: process.env.API_KEY },
        inputData: {
          url: 'https://www.reddit.com/r/CFB/comments/r3mcy9/postgame_thread_michigan_defeats_ohio_state_4227/',
          channel: TEST_CHANNEL,
          identifier: 'cfb',
        },
      })
        .then((results) => {
          should.exist(results.attachments)
          should(results.username.includes('CFB')).be.true()
          done()
        })
        .catch(done)
    })
  })

  describe('fetching identifiers', () => {
    it('should load identifiers', (done) => {
      appTester(App.triggers.identifier.operation.perform, {
        authData: { api_key: process.env.API_KEY },
        inputData: {
          url: 'https://www.reddit.com/r/CFB/comments/r3mcy9/postgame_thread_michigan_defeats_ohio_state_4227/',
        },
      })
        .then((results) => {
          should(results).eql([{ id: 'cfb', name: 'cfb' }])
          done()
        })
        .catch(done)
    })
  })
})
