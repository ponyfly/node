const fs = require('fs')
const {promisify} = require('util')
const co = require('co')
// 第一种  回调函数
const readFile = (path, cb) => {
  fs.readFile(path, (err, data) => {
    if(err) cb(err)
    cb(null, data)
  })
}

readFile('./data.json', (err, data) => {
  if (err) return
  data = JSON.parse(data)
  console.log(data.name)
})
// 第二种 promise
const readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}

readFilePromise('./data.json')
  .then(JSON.parse)
  .then(res=>{
    console.log(res.name)
  })

const readFilePromisify = (path) => {
  return promisify(fs.readFile)(path)
}

readFilePromisify('./data.json')
.then(res=>console.log(JSON.parse(res).name))

// 第三种 co+promsie+generator

co(function* () {
  let data = yield promisify(fs.readFile)('./data.json')
  return JSON.parse(data).name
})
  .then((res) => {
    console.log(res)
  })

const wrapFile = co.wrap(function* (path) {
  let data = yield promisify(fs.readFile)(path)
  return data
})
wrapFile('./data.json')
  .then(res => {
    console.log(JSON.parse(res).name)
  })
  .catch(err =>{
    console.log(err.stack)
  })
//第四种 async
const readFileAsync = async (path) => {
  let data = await promisify(fs.readFile)(path)
  console.log(JSON.parse(data).name)
}
readFileAsync('./data.json')