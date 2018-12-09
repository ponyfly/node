const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/blog'

const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  autoIndex: false,
  reconnectTries: 30,
  reconnectInterval: 500
}

function start(succ) {
  mongoose.connect(uri, options)
    .then(() => {
      console.log('数据库连接成功')
      succ && succ()
    })
    .catch(() => {
      console.log('数据库连接失败')
    })
}

module.exports = {
  start
}