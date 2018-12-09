const fn_hello = async (ctx, next) => {
  const name = ctx.params.name
  ctx.response.body = `hello ${name}`
}

module.exports = {
  'GET /hello/:name': fn_hello
}