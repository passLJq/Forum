/**
 *  封装校验函数
 */
const db = require('../models/db.js')

/**
 * 登录判断
 */
exports.Login = function (req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
  next()
}

/**
 * 判断话题是否存在或user_id是否为用户id
 */
exports.Topic = async function (req, res, next) {
  try {
    const id = req.params.id
    const [topic] = await db.query(`SELECT \`user_id\` FROM topics WHERE id=${id}`)
    // 验证是否有该话题
    if (!topic) {
      return res.status(404).json({
        error: 'Topic not Found.'
      })
    }
    // 验证是否为用户的话题
    const user_id = topic.user_id
    if (user_id !== req.session.user.id) {
      return res.status(400).json({
        error: 'Action Invalid.'
      })
    }

    next()
  } catch (err) {
    next(err)
  }
}

/**
 * 检查评论id是否正确或为改用户的评论
 */
exports.Comment = async function (req, res, next) {
  try {
    const id = req.params.id
    const com = db.query(`SELECT * FROM comments WHERE id=${id}`)
    //验证评论是否存在
    if (!com) {
      return res.status(404).json({
        error: 'Comment not Found.'
      })
    }
    //验证评论用户id是否为用户id
    if (com.user_id !== req.session.user_id) {
      return res.status(404).json({
        error: 'Action Invalid.'
      })
    }
    //通过验证
    next()
  } catch (err) {
    next(err)
  }
}