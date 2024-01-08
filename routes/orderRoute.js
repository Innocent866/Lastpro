const express = require('express');
const { order } = require('../controller/orderController');
const router = express.Router();
const auth = require('../middleware/auth')


router.post('/order',auth,order)

module.exports = router;