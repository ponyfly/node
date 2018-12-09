/*var maxCb = (pre, cur) => Math.max(pre.x, cur.x)
var maxCb2 = (pre, cur) => Math.max(pre, cur)
var maxCb3 = (pre, cur) => Math.max(pre, cur)

var num = [{x:22}, {x:36}, {x:59}].reduce(maxCb)

var str = 'abcdaabcfdafdgedfaef'

var tar = str.split('').reduce((res, cur) => {
  res[cur] ? res[cur]++ : res[cur] = 1
  return res
}, {})

var tarArr = str.split('').reduce((res, cur) => {
  res
}, [])*/

const app = {
  middleware: [],
  callback(ctx) {
    console.log(ctx)
  },
  use(fn) {
    this.middleware.push(fn)
  },
  go(ctx) {
    const reducer = (next, fn, i) => ()=>{fn(ctx, next)}
    this.middleware.reduceRight(reducer, this.callback.bind(this, ctx))()
  }
}
app.use(function(ctx, next) {
  ctx.name = 'zhangsan'
  next()
})
app.use(function(ctx, next){
  ctx.age = 12
  next()
})
app.use(function(ctx, next){
  console.log(`${ctx.name} is ${ctx.age} years old`)
  next()
})
app.go({})
// next       fn
//callback name:zhangsann
//age = (ctx, next) => { age=12}
//name name = (ctx, next) => { name='zhangsan'}