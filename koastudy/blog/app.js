const express = require('express')
const bodyParser = require('body-parser');
const db = require('./db/connect')
require('./modules/article/model')
require('./modules/user/model')
require('./modules/city/model')
const articleRouter = require('./modules/article/route')
const userRouter = require('./modules/user/route')

const app = express()

db.start()

app.set('port', process.env.PORT || 3030)

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(articleRouter)
app.use(userRouter)

app.listen(app.get('port'), () => {
  console.log(`监听成功,端口:${app.get('port')}`)
})
