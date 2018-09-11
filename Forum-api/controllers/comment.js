const db = require('../models/db.js')
const sqlHelper = require('../helper/sqlHelper.js')

/**
 * 获取评论
 * @returns {Promise<void>}
 */
exports.list = async (req, res, next) => {
  try {
    const query = req.query
    const sql = `SELECT * FROM comments WHERE ${sqlHelper.addCondition(query)}`
    const comments = await db.query(sql)
    /*comments.forEach(async (item, i) => {
      const [user] = await db.query(`SELECT * FROM users WHERE id=${item.user_id}`)
      item.user_nickname = user.nickname
      item.avatar = `/api${user.avatar}`
      if (i === comments.length - 1) {
        res.status(200).json(comments)
      }
    })*/
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
}

/**
 * 添加评论
 * @returns {Promise<void>}
 */
exports.create = async (req, res, next) => {
  try {
    const body = req.body
    const reply_id = body.reply_id || 0
    const user_id = req.session.user.id
    // 新增评论数据
    const sql = `INSERT INTO comments(content, create_time, modify_time, topic_id, user_id, reply_id)
    VALUES('${body.content}', '${Date.now()}', '${Date.now()}', '${body.topic_id}', '${user_id}', '${reply_id}')`
    const {insertId} = await db.query(sql)
    // 根据insertId 查询新增后的评论数据并返回
    const [comment] = await db.query(`SELECT * FROM comments WHERE id=${insertId}`)
    res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {

}

/**
 * 删除评论
 * @returns {Promise<void>}
 */
exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id
    const ret = await db.query(`DELETE FROM comments WHERE id=${id}`)
    res.status(201).json({})
  } catch (err) {
    next(err)
  }
}