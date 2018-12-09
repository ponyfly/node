
const pro = () => {
  console.log(1)
  const pro2 = () => {
    return Promise.resolve(2)
  }
  console.log(123)
  return Promise.resolve(pro2())
}
console.log('endend')
pro().then((res) => {
  console.log(res)
})