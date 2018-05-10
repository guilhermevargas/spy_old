const nconf 	 = require('nconf')
const mongoose = require('mongoose')
const app      = require('./config/express.js')

require('./config/passport')(require('passport'))

const databaseUrl = nconf.get("database:url")
const appPort     = nconf.get('app:port')

mongoose.connect(databaseUrl, { useMongoClient: true })
	.then(() => {
		console.log('Connected to the database ' + databaseUrl)
	})
	.catch(err => console.error(`Database connection error: ${err.message}`))

module.exports = app






