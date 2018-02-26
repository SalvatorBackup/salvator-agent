const TokenManager = require('./token-manager')
const HttpServer = require('./http-server')
const Rollbar = require('rollbar')

const rollbar = new Rollbar({
  accessToken: '4775c085c618424f9ba6f3be48ecaf3a',
  captureUncaught: true,
  captureUnhandledRejections: true
})

TokenManager.init()

// HTTP
const httpServer = new HttpServer()
  .setupRoutes()
  .run()
