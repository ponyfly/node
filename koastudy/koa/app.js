const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello koa'
})

app.listen(3000, () => {
  console.log('app listen at 3000')
})
