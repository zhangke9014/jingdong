const mongoose = require('mongoose')

const articlesSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
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

module.exports = articlesSchema