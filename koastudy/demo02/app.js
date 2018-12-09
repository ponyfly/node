const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

const router = new Router()
router.get('/home', async (ctx, next) => {
  let url = ctx.url
  //从上下文直接获取数据
  let ctx_query = ctx.query
  let ctx_queryString = ctx.querystring
  //从上下文request直接获取数据
  let request = ctx.request
  let req_query = request.query
  let req_queryString = request.querystring

  ctx.body = {
    url,
    ctx_query,
    ctx_queryString,
    req_query,
    req_queryString
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3006, () => {
  console.log('start at port 3006')
})