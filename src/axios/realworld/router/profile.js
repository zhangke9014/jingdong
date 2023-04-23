const express = require('express')
const router = express.Router()

const profileEffect = require('../controller/profile')
const { getUserInfo,guanzhu,quxiao} = profileEffect

//获取指定用户资料
router.get('/:username',getUserInfo)
//关注用户
router.post('/:username/follow',guanzhu)

//取消关注
router.delete('/:username/follow',quxiao)

module.exports = router