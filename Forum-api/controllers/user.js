const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db.js')
const sqlHelper = require('../helper/sqlHelper.js')

/**
 * 查询用户表
 * @return {[type]}        [description]
 */
exports.list = async(req, res, next) => {
  const query = req.query
  const addStr = sqlHelper.addCondition(query)
  const sql = `SELECT * FROM users WHERE ${addStr}`
  const ret = await db.query(sql)
  // 有返回值
  if (ret) {
    res.status(200).json(ret)
    return 
  }
  // 邮箱与昵称都不存在，返回空
  res.status(200).json({})
}

/**
 * 创建用户
 * @return {[type]}        [description]
 */
exports.create = async(req, res, next) => {
  try {
    let body = req.body
    const str = `INSERT INTO users(password, email, nickname, avatar, gender, create_time, modify_time)
    VALUES(
      '${md5(md5(body.password))}',
      '${body.email}',
      '${body.nickname}',
      'default-avatar.png',
      '0',
      '${moment().format('YYYY-MM-DD hh:mm:ss')}',
      '${moment().format('YYYY-MM-DD hh:mm:ss')}'
      )`

    const ret = await db.query(str)
    const [user] = await db.query(`SELECT * FROM users where id='${ret.insertId}'`)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

/**
 * 修改用户数据
 * @return {[type]}  
 */
exports.update = async (req, res, next) => {
  try {
    const body = req.body
    const {id} = req.params
    // 如果包含密码项，则加密
    if (body.password) {
      body.password = md5(md5(body.password))
    }
    const addStr = sqlHelper.updateCondition(body)
    const sql = `UPDATE users SET${addStr} WHERE id=${id}`
    await db.query(sql)
    // 修改后 重新查询返回信息
    const [user] = await db.query(`SELECT * FROM users WHERE id=${id}`)
    req.session.user = user
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

/**
 * 用户修改密码
 */
exports.changePassword = async (req, res, next) => {
  try {
    const body = req.body
    const {id} = req.params
    body.password = md5(md5(body.password))
    const [user] = await db.query(`SELECT * FROM users WHERE id=${id}`)
    if (body.password !== user.password) {
      res.status(201).json({
        message: 'Incorrect password.'
      })
    }
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}


exports.destroy = async (req, res, next) => {

}