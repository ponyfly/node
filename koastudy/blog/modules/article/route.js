const express = require('express')

const router = express.Router()

const controller = require('./controller')

router.post('/api/article/add', controller.add)

router.delete('/api/article/remove', controller.remove)

router.put('/api/article/update', controller.update)

router.get('/api/article/find', controller.find)

module.exports = router
