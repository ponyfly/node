const randomId = () => {
  return Math.ceil(Math.random() * 100000).toString()
}

module.exports = {
  randomId
}