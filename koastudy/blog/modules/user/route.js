const express = require('express')

const router = express.Router()

const controller = require('./controller')

router.get('/api/user/address', controller.findAddress)

module.exports = router
