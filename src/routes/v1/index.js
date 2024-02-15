const express = require('express')
const router = express.Router()

const {create} = require('../../controllers/index')
router.post('/tickets',create)



module.exports = router