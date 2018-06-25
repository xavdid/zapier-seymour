const ChannelTrigger = require('./triggers/channel')
const ItemCreate = require('./creates/item')

const common = require('./common')

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
    (request, z, bundle) => {
      request.params.api_key = bundle.authData.api_key
      return request
    }
  ],

  afterResponse: [
    (response, z) => {
      if (response.status >= 400) {
        throw new Error(response.content)
      } else if (response.json) {
        return response.json
      } else {
        return z.JSON.parse(response.content)
      }
    }
  ],

  triggers: { [ChannelTrigger.key]: ChannelTrigger },

  creates: { [ItemCreate.key]: ItemCreate },

  authentication: {
    type: 'custom',
    fields: [
      {
        key: 'api_key',
        type: 'string',
        required: true,
        helpText: 'Try going [here](https://google.com)'
      }
    ],
    connectionLabel: 'david',
    test: z => {
      return z.request({
        url: `${common.baseUrl}/channels`
      })
    }
  }
}

// Finally, export the app.
module.exports = App
