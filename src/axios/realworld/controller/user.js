const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
exports.login = async(req,res,next)=>{
    try{
        //1.数据验证
        //2.生成token
        const user = req.user.toJSON()
        delete user.password
        const token = await jwt.sign({
            userId:user._id
        },jwtSecret)
        //3.发送成功响应
        res.status(200).json({
            ...user,
            token
        })
    }
    catch(err){
        next(err)
    }
        
}

exports.register = async(req,res,next)=>{
    try{
        //console.log(req.body);
        //1.获取请求数据
        //2.数据验证
        //3.将数据保存到数据库 
        const user = new User(req.body.user)
        //4.发送成功响应
        await user.save()
        res.status(201)
        .json({user})
    }
    catch(err){
        next(err)
    }
}

exports.update = async(req,res,next)=>{
    try{
        res.send('put/user')
    }
    catch(err){
        next(err)
    }
}

exports.getCurrentUser = async(req,res,next)=>{
    try{
        res.status(200).json({
            user:req.user
        })
    }
    catch(err){
        next(err)
    }
}