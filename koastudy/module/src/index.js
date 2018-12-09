import {
  a as num,
  name as name2,
  getName as getName2
} from "./module1.js"
import  age2 from './module1.js'

import {readFile} from 'fs'
import {resolve as r} from 'path'

console.log(num)
console.log(name2)
console.log(getName2())
console.log(age2)

const readFileAsync = async (path) => {
  readFile(r(__dirname, path), (err, data) => {
    console.log(JSON.parse(data).name)
  })
  let ff = await Promise.resolve(3)
  console.log(ff)
}

readFileAsync('../../package.json')

const arr = [1,2,3,5]

console.log(arr.includes(2))

const newO = Object.assign({},{name: 'zhangsan'})
console.log(newO)

new Set([1,2,3])
console.log('hello'.padStart(5, 'X'))

function * say() {

}

class Person {
}