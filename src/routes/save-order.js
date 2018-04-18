const path = require('path')
const archiver = require('archiver')
const globby = require('globby')

const fs = require('fs')

module.exports = async function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream'
  })

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  res.on('error', err => console.log(err))
  res.on('end', () => console.log('Send end'))
  archive.on('error', err => console.log(err))
  archive.on('end', () => console.log('Archived'))
  const debugStream = require('debug-stream')('my-app')

  archive.pipe(debugStream()).pipe(res)

  const filenames = await globby(req.body.includes, { ignore: req.body.excludes })
  filenames.forEach(filename => archive.file(filename, {
    name: path.relative(process.cwd(), filename)
  }))

  archive.finalize()
}