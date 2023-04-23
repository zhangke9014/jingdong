exports.getUserInfo = async(req,res)=>{
    try{
        res.send('profiles/username')
    }
    catch(err){
        next(err)
    }
}

exports.guanzhu = async(req,res)=>{
    try{
        res.send('username/follow')
    }
    catch(err){
        next(err)
    }
}

exports.quxiao = async(req,res)=>{
    try{
        res.send('put/user')
    }
    catch(err){
        next(err)
    }
}