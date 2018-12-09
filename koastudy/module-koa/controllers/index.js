const fn_index = async (ctx, next) => {
  ctx.response.body = '<form action="/signin" method="post">\n' +
    '            <p>Name: <input name="name" value="koa"></p>\n' +
    '            <p>Password: <input name="password" type="password"></p>\n' +
    '            <p><input type="submit" value="Submit"></p>\n' +
    '        </form>'
}

const fn_signin = async (ctx, next) => {
  const {name, password} = ctx.request.body
  if(name === 'koa' && password === '123456') {
    ctx.response.body = `<h1>welcome ${name}</h1>`
  } else {
    ctx.response.body = `<h1><a href="/">try again</a></h1>`
  }
}

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
}