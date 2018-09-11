const db = require('../models/db.js')
const md5 = require('blueimp-md5')

/**
 * 获取当前登录用户信息
 */
exports.get = (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user)
  }
  res.status(404).json()
}
/**
 * 用户登录
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = async(req, res, next) => {
  try {
    const body = req.body
    body.password = md5(md5(body.password))
    const sql = `SELECT * FROM users WHERE 
    email='${body.email}' 
    and password='${body.password}'`
    const [user] = await db.query(sql)
    if (!user) {
      return res.status(404).json({
        error: 'Invalid email or password!'
      })
    }
    //登录成功，记录 session
    req.session.user = user
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

/**
 * 注销登录
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.destroy = (req, res, next) => {
  delete req.session.user
  res.status(201).json({})
}