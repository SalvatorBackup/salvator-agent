const express = require('express')
const bodyParser = require('body-parser')

const TokenManager = require('./token-manager')

class HttpServer {
  constructor() {
    this.app = express()
  }

  setupRoutes() {
    this.app
      .use((req, res, next) => {
        const xAuth = req.header('x-auth')
        if(xAuth === undefined)
          return res.status(403).send('Missing token')
        else if(xAuth !== TokenManager.token)
          return res.status(401).send('Bad token')

        next()
      })
      .use(bodyParser.json())
      .get('/ping', require('./routes/ping'))
      .post('/save-order', require('./routes/save-order'))

    return this
  }

  run() {
    this.app.listen(process.env.HTTP_PORT || 8080, () => console.log(`Agent listening on port ${process.env.HTTP_PORT || 8080}`))
  }
}

module.exports = HttpServer
