const Koa = require('koa')
const bodyParse = require('koa-bodyparser')

const controller = require('./controller')

const app = new Koa()

app.use(bodyParse())
app.use(controller())

app.set('port', 3006)

app.listen(app.get('port'), () => {
  console.log('app lister at port' + 3006)
})