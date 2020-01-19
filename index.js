/* no-global-assign Promise */
const mongoose = require('mongoose')

// config should be consted before importing any other file
const config = require('./config/config')
const app = require('./config/express')

// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = global.Promise

// connect to mongo db
const mongoUri = config.mongo.host
mongoose.connect(mongoUri, {
  useMongoClient: true,
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
})
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

// module.parent check is required to support mocha watch
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port}`)
  })
}

module.exports = app  