const Koa = require('koa')
const serverStatic = require('koa-static')
const bodyParse = require('koa-bodyparser')
const path = require('path')

const controller = require('./controller')

const app = new Koa()

const home = serverStatic(`${path.join(__dirname)}/public/`);

app.use(home)
app.use(bodyParse())
app.use(controller())

app.set('port', 3006)

app.listen(app.get('port'), () => {
  console.log('app lister at port' + 3006)
})