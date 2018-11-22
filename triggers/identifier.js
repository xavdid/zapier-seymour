const common = require('../common')

const findIdentifier = (z, bundle) => {
  return z
    .request({
      url: `${common.baseUrl}/identifiers`,
      params: { url: bundle.inputData.url }
    })
    .then(res => res.map(i => ({ id: i, name: i })))
}

module.exports = {
  key: 'identifier',
  noun: 'Identifier',

  display: {
    label: 'Get Identifier for URL',
    description: 'Dynamic dropdown for identifiers.',
    hidden: true
  },

  operation: {
    perform: findIdentifier
  }
}
