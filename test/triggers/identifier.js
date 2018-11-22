/* globals describe it */
const should = require('should')

const zapier = require('zapier-platform-core')

// Use this to make test calls into your app:
const App = require('../../index')
const appTester = zapier.createAppTester(App)
zapier.tools.env.inject()

describe('My App', () => {
  it('should run triggers.identifier', done => {
    const bundle = {
      inputData: { url: 'https://www.youtube.com/watch?v=mephJf3-zYE' }
    }

    appTester(App.triggers.identifier.operation.perform, bundle)
      .then(results => {
        should(results.length).aboveOrEqual(3)
        done()
      })
      .catch(done)
  })
})
