const common = require('../common')

// triggers on channel with a certain tag
const triggerChannel = (z, bundle) => {
  return z.request({
    url: `${common.baseUrl}/channels`
  })
}

module.exports = {
  key: 'channel',
  noun: 'Channel',

  display: {
    label: 'Get Channel',
    description: 'Triggers on a new channel.',
    hidden: true
  },

  operation: {
    perform: triggerChannel
  }
}
