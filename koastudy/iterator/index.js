/**
 * 创建迭代器函数
 * @param arr
 * @returns {*}
 */
/*
function makeIterator(arr) {
  let nextIndex = 0
  return {
    next() {
      return nextIndex < arr.length ?
        {value: arr[nextIndex++],done: false} :
        {value: undefined, done: true}
    }
  }
}
const myIterator = makeIterator(['吃饭','睡觉','打豆豆'])
console.log(myIterator.next().value)
console.log(myIterator.next().value)
console.log(myIterator.next().value)
console.log(myIterator.next().value)*/

/*es6实现*/
function *gen(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}
const arr = ['吃饭','睡觉','打豆豆']
//---------------調用gen生成函數，生成迭代器
const myGen = gen(arr)
//---------------調用gen生成函數，生成迭代器
console.log(myGen.next().value)
console.log(myGen.next().value)
console.log(myGen.next().value)
console.log(myGen.next().value)