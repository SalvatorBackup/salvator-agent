const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')

class TokenManager {
  static init(){
    const tokenPath = path.join(__dirname, '.token')

    const isFirstLaunch = fs.existsSync(tokenPath) === false
    if (isFirstLaunch === true) {
      const token = uuid()
      fs.writeFileSync(tokenPath, uuid())
      console.log(`First run, token generated: ${token}`)
    }

    TokenManager.token = fs.readFileSync(tokenPath).toString()
  }
}


module.exports = TokenManager
