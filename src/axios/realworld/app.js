const express = require('express')
//配置生产日志插件
const morgan = require('morgan')
//配置跨域请求
const cors = require('cors')
//配置路由,避免app过大
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
 require('./model')
const app = express()

app.use(morgan('dev'))
//配置请求体解析(json格式和urlencoded)
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    "Access-Control-Allow-Origin":"*"
}))
const PORT  = process.env.PORT || 3000

app.use('/api',router)
app.use(errorHandler())


app.listen(PORT,()=>{
    console.log(`Success running at http://localhost:${PORT}`);
})
