/* globals describe it */

require('should')

const zapier = require('zapier-platform-core')
const TEST_CHANNEL = 'C6RBZ562Z'

// Use this to make test calls into your app:
const App = require('../index')
const appTester = zapier.createAppTester(App)
zapier.tools.env.inject('.env')

describe('My App', () => {
  it('should load channels', done => {
    appTester(App.triggers.channel.operation.perform, {
      authData: { api_key: process.env.API_KEY }
    })
      .then(results => {
        results.length.should.be.aboveOrEqual(3)
        done()
      })
      .catch(done)
  })
})

describe('Posting Items', () => {
  it('should send data', done => {
    appTester(App.creates.item.operation.perform, {
      authData: { api_key: process.env.API_KEY },
      inputData: {
        url:
          'https://www.macstories.net/linked/microsoft-outlook-for-mac-undergoing-major-redesign/',
        channel: TEST_CHANNEL
      }
    })
      .then(results => {
        results.ok.should.be.true()
        done()
      })
      .catch(done)
  })

  it('should send re-parsed data', done => {
    appTester(App.creates.item.operation.perform, {
      authData: { api_key: process.env.API_KEY },
      inputData: {
        url: 'https://www.factorio.com/blog/post/fff-212',
        channel: TEST_CHANNEL,
        re_parse: true
      }
    })
      .then(results => {
        results.ok.should.be.true()
        done()
      })
      .catch(done)
  })

  it('should use an identifier', done => {
    appTester(App.creates.item.operation.perform, {
      authData: { api_key: process.env.API_KEY },
      inputData: {
        url:
          'https://www.reddit.com/r/CFB/comments/8tmtky/2019_4_dt_mazi_smith_commits_to_michigan/',
        channel: TEST_CHANNEL,
        identifier: 'cfb'
      }
    })
      .then(results => {
        results.ok.should.be.true()
        done()
      })
      .catch(done)
  })
})
