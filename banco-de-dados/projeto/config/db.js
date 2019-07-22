//configurar onde esta o arquivo knexfile.js
const config = require('../knexfile.js')
module.exports = require('knex')(config)