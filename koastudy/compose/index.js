const compose = require('koa-compose')

function one(ctx, next) {
  console.log('第一个')
  next()
  console.log('第一个after')
}
function two(ctx, next) {
  console.log('第二个')
  next()
  console.log('第二个after')
}
function three(ctx, next) {
  console.log('第三个')
  next()
  console.log('第三个after')
}

const middlewares = compose([one, two, three])
middlewares().then(function () {
  console.log('执行完毕')
})


/*
const pro = () => {
  const pro2 = () => {
    console.log(2)
    return Promise.resolve(3)
  }
  const pro1 = () => {
    console.log(1)
    return Promise.resolve(pro2())
  }
  return Promise.resolve(pro1())
}
pro().then(res => console.log(res))
console.log('end')*/
