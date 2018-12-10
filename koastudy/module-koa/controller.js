const fs = require('fs')
const path = require('path')

function addController(router, dir) {
  const files = fs.readdirSync(path.resolve(__dirname, dir))
  const jsFiles = files.filter(f => f.endsWith('.js'))
  for (const jsFile of jsFiles) {
    const mapping = require(path.resolve(__dirname, dir, jsFile))
    for (const key in mapping) {
      const method = key.match(/\w+(?=\s)/)[0]
      const url = key.match(/\s(.+)/)[1]
      router[method.toLowerCase()](url, mapping[key])
    }
  }
}

module.exports = function (dir) {
  const controllersDir = dir || 'controllers'
  const router = require('koa-router')()
  addController(router, controllersDir)
  return router.routes()
}
