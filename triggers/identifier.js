const common = require('../common')

const findIdentifier = async (z, bundle) => {
  const response = await z.request({
    url: `${common.baseUrl}/identifiers`,
    params: { url: bundle.inputData.url },
  })

  return response.data.map((i) => ({ id: i, name: i }))
}

module.exports = {
  key: 'identifier',
  noun: 'Identifier',

  display: {
    label: 'Get Identifier for URL',
    description: 'Dynamic dropdown for identifiers.',
    hidden: true,
  },

  operation: {
    perform: findIdentifier,
  },
}
