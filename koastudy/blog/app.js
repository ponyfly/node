const express = require('express')
const bodyParser = require('body-parser');
const db = require('./db/connect')
require('./modules/article/model')
const router = require('./modules/article/route')

const app = express()

db.start()

app.set('port', process.env.PORT || 3036)

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(router)

app.listen(app.get('port'), () => {
  console.log(`监听成功,端口:${app.get('port')}`)
})