const Koa = require('koa')
const router = require('koa-router')()
const bodyParse = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParse())

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
})

router.get('/home/:name', (ctx, next) => {
  const name = ctx.params.name
  ctx.response.body = `hello ${name}`
})

router.get('/', (ctx, next) => {
  ctx.response.body = '<form action="/signin" method="post">\n' +
    '            <p>Name: <input name="name" value="koa"></p>\n' +
    '            <p>Password: <input name="password" type="password"></p>\n' +
    '            <p><input type="submit" value="Submit"></p>\n' +
    '        </form>'
})

router.post('/signin', async(ctx, next) => {
  const {name, password} = ctx.request.body
  console.log(`signin with name: ${name}, password: ${password}`)
  if(name === 'koa' && password === '123456') {
    console.log('登陆成功')
    ctx.response.body = `<h1>welcome ${name}</h1>`
  } else {
    ctx.response.body = '<h1>login failed</h1>' +
    '<p><a href="/">try again</a></p>'
  }
})

app.use(router.routes())

app.listen(3006)
console.log('app started at port 3006')