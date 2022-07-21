const common = require('../common')

// create a particular item by name
const createItem = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `${common.baseUrl}/item`,
    body: bundle.inputData,
  })

  return response.data
}

module.exports = {
  key: 'item',
  noun: 'Item',

  display: {
    label: 'Create Item',
    description: 'Posts an item to the channel of your choosing.',
  },

  operation: {
    inputFields: [
      { key: 'url', type: 'string', required: true },
      {
        key: 'channel',
        type: 'string',
        required: true,
        dynamic: 'channel.id.name',
      },
      {
        key: 'identifier',
        type: 'string',
        helpText:
          'Used to differentiate between similar content on the same domain',
        dynamic: 'identifier.name.name',
      },
      {
        key: 're_parse',
        label: 'Extra Parser',
        type: 'boolean',
        helpText:
          "Set to true if Slack doens't do a good job parsing the metadata",
      },
    ],
    perform: createItem,
  },
}
