const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  if(ctx.request.path === '/') {
    ctx.response.body = '<h1>index page</h1>'
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.request.path === '/test') {
    ctx.response.body = '<h1>test page</h1>'
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.request.path === '/error') {
    ctx.response.body = '<h1>error page</h1>'
  } else {
    await next()
  }
})

app.listen(3006)
console.log('app start at port 3006')