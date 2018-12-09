function getData(x) {
  return new Promise(resolve => {
    setTimeout(resolve,800,x*2)
  })
}

function getData2(y) {
  return new  Promise((resolve, reject) => {
    // setTimeout(() => {
    //   throw new Error('error')
    // },600)
    setTimeout(resolve,600,y*2)
  })
}

async function add(x, y) {
  const data3 = await Promise.all([getData(x), getData2(y)])
  console.log(data3[0] + data3[1])
  // Promise.all([data1, data2])
  //   .then(res =>{
  //     const addData = res[0] + res[1]
  //     console.log(addData)
  //   })
  //   .catch(console.log)
}
add(2,3)

function race(x,y) {
  const data1 = getData(x)
  const data2 = getData2(y)

  Promise.race([data1, data2])
    .then(console.log)
    .catch(console.log)
}
race(2,3)
async function getAllData() {
  const d1 = await getData(2)
  const d2 = await getData(2)
  const d3 = await getData(3)
  console.log(d1 + d2 + d3)
}
// getAllData()

// const map = new Map()
// map.set('zhangsan', 100)
// // console.log(map)
// const map2 = new Map([['hello', 'world'], ['good', 'morning'], ['nk', null], ['price']])
// const mset = new Set([3,6,9,{name: 'zhangsan'}])
// mset.add('a')
// mset.add('b')
//
// // map2.forEach((k,v,m) => {
// //   console.log(k, v)
// // })
//
// mset.forEach((v, m) => {
//   console.log(m+1)
// })
//
//
// var x, y;
// ({x, y} = { name: '小明', x: 100, y: 200})
// console.log(x,y)