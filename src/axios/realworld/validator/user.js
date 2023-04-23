const validate = require('../middleware/validate')
const { User } = require('../model')
const { body } = require('express-validator');
const md5 = require('../util/md5')
exports.register = validate(
    [
        body('user.username').notEmpty().
            withMessage('用户姓名不可以为空值！').
            custom(async username => {
                const user = await (User.findOne({ username }))
                if (user) {
                    return Promise.reject('当前用户(名)已存在')
                }
            }),
        body('user.password').notEmpty().withMessage('用户密码不可以为空值！')
    ])

exports.login = [
    validate([
        body('user.username').notEmpty().withMessage('用户名不可以为空值！'),
        body('user.password').notEmpty().withMessage('用户密码不可以为空值！')
    ]),
    validate([
        body('user.username').
        custom(async (username,{req}) => {
            const user = await User.findOne({ username })
            if (!user) {
                return Promise.reject('用户不存在')
            }
            req.user = user
        })
    ]),
    validate([
        body('user.password').custom(async (password ,{ req })=> {
            console.log(req.user);
            if(md5(password)!==req.user.password){
            //if(password!==req.password) 
                return Promise.reject('密码错误!')
            }
        })
    ])
]