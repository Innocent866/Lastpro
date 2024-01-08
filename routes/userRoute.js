const express = require('express')
const { registration, login, getUserName, logout, isLoggedIn, forgotPassword, resetPassword } = require('../controller/userController')
const auth = require('../middleware/auth')
const router = express.Router()
// const auth = require('../middleware/auth')

// register
router.post('/registration',registration)
router.post('/login',login)
router.get('/getUserName',auth ,getUserName)
router.get('/logout',logout)
router.get('/isloggedin',isLoggedIn)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken' ,resetPassword)

module.exports = router;