const common = require('../common')

// create a particular item by name
const createItem = (z, bundle) => {
  return z.request({
    method: 'POST',
    url: `${common.baseUrl}/item`,
    body: bundle.inputData
  })
}

module.exports = {
  key: 'item',
  noun: 'Item',

  display: {
    label: 'Create Item',
    description: 'Posts an item to the channel of your choosing.'
  },

  operation: {
    inputFields: [
      { key: 'url', type: 'string', required: true },
      {
        key: 'channel',
        type: 'string',
        required: true,
        dynamic: 'channel.id.name'
      },
      {
        key: 'identifier',
        type: 'string',
        helpText:
          'Used to differentiate between similar content on the same domain'
      },
      {
        key: 're_parse',
        label: 'Extra Parser',
        type: 'boolean',
        helpText:
          "Set to true if Slack doens't do a good job parsing the metadata"
      }
    ],
    perform: createItem
  }
}
