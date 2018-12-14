const original = new Promise(resolve => {
  resolve(2)
})
new Promise(resolve => {
  process.nextTick(() => {
    original.then((res) => {
      resolve(res)
    })
  })
  Promise.resolve().then(() => Promise.resolve().then(() => console.log(1)))
  console.log(4)
}).then(t => console.log(t))
console.log(3)

/*
* async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
})

async1()

new Promise((resolve, reject) => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})

console.log('script end')
* */
