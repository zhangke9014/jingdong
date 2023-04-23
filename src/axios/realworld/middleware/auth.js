const { verify }= require('../util/jwt')
const {jwtSecret} = require('../config/config.default')
const { User } = require('../model')

module.exports =async (req,res,next) =>{
    //从请求头获取token数据
    let token = req.headers['authorization']
    console.log(token.split('Bearer ')[1]);
    token = token?token.split('Bearer ')[1]:null
    if(!token) {
        return res.status(401).end()
    }
    try {
        const decodedToken = await verify(token,jwtSecret)
        console.log(decodedToken);
        req.user = await User.findById(decodedToken.userId)
        next()
    }
    catch(err){
        return res.status(401).end()
    }
    //验证token是否有效
    //无效返回401状态有效将信息读取出来挂载到req对象上面

}