// 第一种
/*function fetch1(succ) {
  const timer = Math.ceil(Math.random() * 1000)
  setTimeout(() => {
    succ.result1 = 1
    succ(succ.result1, succ.result2)
  }, timer)
}

function fetch2(succ) {
  const timer = Math.ceil(Math.random() * 1000)
  setTimeout(() => {
    succ.result2 = 2
    succ(succ.result1, succ.result2)
    return 2
  }, timer)
}


function succ(f1, f2) {
  if (!(f1 && f2)) return
  console.log(f1 + f2)
}

fetch1(succ)
fetch2(succ)*/

// 第二种
/*function fetch1() {
  const timer = Math.ceil(Math.random() * 1000)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, timer)
  })
}

function fetch2() {
  const timer = Math.ceil(Math.random() * 1000)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, timer)
  })
}


function add(f1, f2) {
  const promiseFetch1 = f1()
  const promiseFetch2 = f2()
  Promise.all([promiseFetch1, promiseFetch2])
    .then((res) => {
      console.log(res[0] + res[1])
    })
}

add(fetch1, fetch2)*/

// 第三种
function fetch1() {
  const timer = Math.ceil(Math.random() * 1000)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, timer)
  })
}

function fetch2() {
  const timer = Math.ceil(Math.random() * 1000)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error('fetch出错了'))
      resolve(2)
    }, timer)
  })
}

/*async function add(f1, f2) {
  const promises = [f1(), f2()]
  let result
  try {
    result = await Promise.all(promises)
  } catch (err) {
    console.log('err')
  }
  if (result && result.length === 2) {
    console.log(result[0] + result[1])
  }
}*/
// 或者
async function add(f1, f2) {
  const promises = [f1(), f2()]
  let result
  try {
    result = await Promise.all(promises)
  } catch (err) {
    console.log(err)
  }
  if (result && result.length === 2) {
    result = result[0] + result[1]
  }
  return result
}

add(fetch1, fetch2).then(res => console.log(res))

function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => fetch(url).then(response => response.text()))
  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text))
  }, Promise.resolve())
}

async function logInOrderAsync(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(async (url) => {
    const response = await fetch(url)
    return response.text()
  })
  // 按次序输出
  for (let textPromise of textPromises) {
    console.log(await textPromise)
  }
}

function logInOrder(urls) {
  const promises = urls.map(url => fetch(url).then(response => response.text()))

  promises.reduce((chain, textPromise) => {
    return chain
      .then(() => textPromise)
      .then(text => console.log(text))
  }, Promise.resolve())
}

// 为什么会这样呢？分析一下
/*
0 initpromsie 1promise    return initPromise(1promise).then(1promise).then(console.log(1))
1 initPromise 2promise      return initPromise(1promise).then(1promise).then(console.log(1)).then(2promise).then(console.log(2))
2 initPromise(1promise).then(1promise).then(console.log(1)).then(2promise).then(console.log(2)) 3promise      return initPromise(1promise).then(1promise).then(console.log(1)).then(2promise).then(console.log(2)).then(3promise).then(console.log(3))
* */
// 简单的例子---------------------------------------------------
const mypromsie = new Promise((resolve, reject) => {
  resolve('hello')
})
const promise1 = mypromsie.then((r) => {
  return r + ' world'
})
promise1.then(r => console.log(r))
// 相当于这个例子
const mypromsie2 = new Promise((resolve, reject) => {
  resolve('hello')
})
const promise3 = mypromsie.then((r) => {
  return r + ' world'
}).then(r => console.log(r))
// 简单的例子---------------------------------------------------
// 所以logInOrder中的reduce为什么会这样就明白了吧

const promise5 = new Promise((resolve, reject) => {
  resolve(Promise.resolve(5))
})
