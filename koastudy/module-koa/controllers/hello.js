const fnHello = (ctx) => {
  const { name } = ctx.params
  ctx.response.body = `hello ${name}`
}

module.exports = {
  'GET /hello/:name': fnHello,
}
