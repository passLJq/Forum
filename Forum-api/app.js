const express = require('express')
const router = require('./router.js')
const bodyParser = require('body-parser')
const session = require('express-session')
const httpProxy = require('http-proxy')
const config = require('./config.js')

const app = express()

// 解析表单请求体
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//配置session 
app.use(session({
  secret: 'passljq',
  resave: false,
  saveUninitialized: false,
  name: 'Forum',
  cookie: {
    expires: 7 * 24 * 60 * 60 * 1000 //cookie 默认保存7天
  }
}))

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
//   res.header("X-Powered-By",' 3.2.1')
//   next()
// })

// 开放静态资源
app.use('/public/',express.static('./public/'))

// 启用路由
app.use(router)

// 500错误处理
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
})

app.listen(config.port, function () {
  console.log('running at 3000')
})

