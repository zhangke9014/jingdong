const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/realworld")

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(' MongoDb succeed conncetion');
});

//导出模型构造函数

module.exports = {
    User:mongoose.model('User',require('./user')),
    Artricle:mongoose.model('Article',require('./article'))
}