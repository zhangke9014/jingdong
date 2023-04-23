const mongoose = require('mongoose')
const md5 = require('../util/md5')
const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true,
        set:value=>md5(value),
        //select:false
    },bio:{
        type: String,
        default: null
    },image :{
        type: String,
        default: null
    },creatAt: {
        type: Date,
        default:Date.now
    },updateAt: {
        type: Date,
        default:Date.now
    }

})

module.exports = usersSchema