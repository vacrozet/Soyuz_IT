const express = require('express')
const router = express.Router()

router.use('/user', require('./user.js'))
router.use('/society', require('./society.js'))
router.use('/project', require('./project.js'))
router.use('/doc', require('./doc.js'))

module.exports = router
