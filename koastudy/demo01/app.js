const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

const router = new Router()
const page1Router = new Router()
const page2Router = new Router()

/*page1路由*/
page1Router.get('/home', (ctx, next) => {
  ctx.body = 'page1 home'
})

page1Router.get('/todo', (ctx, next) => {
  ctx.body = 'page1 todo'
})

/*page2路由*/
page2Router.get('/home', (ctx, next) => {
  ctx.body = 'page2 home'
})

page2Router.get('/todo', (ctx, next) => {
  ctx.body = 'page2 todo'
})

router.use('/page1', page1Router.routes())
router.use('/page2', page2Router.routes(), page2Router.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3006, () => {
  console.log('start at port 3006')
})