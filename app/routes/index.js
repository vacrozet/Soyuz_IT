const express = require('express')
const router = express.Router()

router.use('/user', require('./user.js'))
router.use('/society', require('./society.js'))

module.exports = router
