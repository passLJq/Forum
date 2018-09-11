const fs = require('fs')
const db = require('../models/db.js')

exports.avatar = async (req, res, next) => {
  try {
    const body = req.body
    const {dataURL} = body
    const {user_id} = body
    
    // 转为二进制格式储存
    const base64URL = dataURL.split(',')[1]
    const buffer = new Buffer(base64URL, 'base64')
    // 生成随机字符串
    let str = '/public/avatarImage/' + Date.now() + '_' + Math.random().toString().substr(2,8) + '.jpeg'
    // 写入公共静态资源文件夹
    fs.writeFile(`.${str}`, buffer, function(err) {
      if (err) throw err
    })
    const sql = `UPDATE users SET avatar='${str}' WHERE id=${user_id}`
    const ret = await db.query(sql)
    res.status(200).json({
      avatar: str
    })
  } catch (err) {
    next(err)
  }
}

