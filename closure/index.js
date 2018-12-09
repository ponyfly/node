/*栗子1*/
// var g = 'global'
// function fn1() {
//   var a = 'hello'
//   function fn2() {
//     var b = 'world'
//     function fn4() {
//       console.log(a+b)
//     }
//     return fn4
//   }
//   return fn2
// }
// const fn3 = fn1()
// const fn5 = fn3()
// fn3()()
/*栗子2*/
/*
for (var i = 0; i < 10; i++) {
  (function (a) {
    console.log(a)
  })(i)
}*/
/*栗子3*/
/*
let a = 1
function test() {
  console.log(a++)
}

function before(n, func) {
  if (typeof func !== 'function') {
    throw new TypeError('expected is function')
  }
  return function(...args) {
    if (n-- > 0) {
      func.apply(this, args)
    } else {
      func = undefined
    }
  }
}

setInterval(before(6, test), 100)*/
/*栗子4*/
function test() {
  console.log('hello')
}

function ttrottle(func, time) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(func, time)
  }
}

window.onscroll = ttrottle(test, 500)
