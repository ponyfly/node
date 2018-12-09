const fs = require('fs')
const path = require('path')

function addController(router, dir) {
  const files = fs.readdirSync(path.resolve(__dirname, dir))
  const js_files = files.filter(f => f.endsWith('.js'))
  for (let js_file of js_files) {
    const mapping = require(path.resolve(__dirname, dir, js_file))
    for (let key in mapping) {
      const method = key.match(/\w+(?=\s)/)[0]
      const url = key.match(/\s(.+)/)[1]
      router[method.toLowerCase()](url, mapping[key])
    }
  }
}

module.exports = function (dir) {
  const controllers_dir = dir || 'controllers'
  const router = require('koa-router')()
  addController(router, controllers_dir)
  return router.routes()
}