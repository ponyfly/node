const events = require('events')
const util = require('util')

const myEvent = new events.EventEmitter()

myEvent.on('someEvent', (message) => {
  console.log(message)
})
myEvent.emit('someEvent', 'good')

const Person = function(name) {
  this.name = name
}
util.inherits(Person, events.EventEmitter)

const lili = new Person('lili')
const xiaoming = new Person('xiaoming')
const honghong = new Person('honghong')

const arr = [lili, xiaoming, honghong]
arr.forEach(a=>{
  a.on('sayMsg', (message)=>{
    console.log(a.name + ' say ' + message)
  })
})

lili.emit('sayMsg', 'hi')
xiaoming.emit('sayMsg', 'how are you')

setTimeout(() => {
  console.log(__filename)
}, 300)

let a = 3
const timer = setInterval(() => {
  a += 2
  console.log(a)
  if(a>10) {
    clearInterval(timer)
  }
})

function callBack(fun, name) {
  fun(name)
}
function sayBName(name) {
  console.log(name)
}

callBack((name) => {
  console.log(name)
}, 'hello')


