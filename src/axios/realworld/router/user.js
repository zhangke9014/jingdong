const express = require('express')
const router = express.Router()
const uservalidator = require('../validator/user')
const UserEffect = require('../controller/user')
const {login,register,getCurrentUser,update} = UserEffect
const auth = require('../middleware/auth')
//用户登录
router.post('/users/login',uservalidator.login,login)
//用户注册
router.post('/users/register',uservalidator.register,register)
//用户更新
router.put('/user',auth,uservalidator.login,update)
//获取当前用信息
router.get('/user',auth,getCurrentUser)

module.exports = router