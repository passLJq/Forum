const db = require('../models/db.js')
const moment = require('moment')

// 通过ID查询话题
exports.getOneById = async (req, res, next) => {
  try {
    const {id} = req.params
    const sql = `SELECT * FROM topics WHERE id=${id}`
    const [ret] = await db.query(sql)
    res.status(200).json(ret)

  } catch (err) {
    next(err)
  }
}

//获取分页话题列表
exports.list = async (req, res, next) => {
  try {
    let _page = req.query._page || 1
    let _limit = req.query._limit || 20
    if (_page < 1) {
      _page = 1
    }
    if (_limit < 1) {
      _limit = 1
    }
    if (_limit > 20) {
      _limit = 20
    }
    const start = (_page - 1) * _limit

    const sql = `SELECT * FROM topics LIMIT ${start}, ${_limit}`
    const topics = await db.query(sql)
    // 获取总话题数 用以计算分页
    const count = await db.query(`SELECT COUNT(*) as count FROM topics`)

    res.status(200).json({topics, count})
  } catch (err) {
    next(err)
  }
}

// 创建话题
exports.create = async (req, res, next) => {
  try {
    const body = req.body
    body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.user_id = req.session.user.id
    const sql = `insert into topics(title, content, user_id, create_time, modify_time)
    values('${body.title}', '${body.content}', '${body.user_id}', '${body.create_time}', '${body.modify_time}')`

    const ret = await db.query(sql)
    // 返回数据库中创建的话题
    const [topic] = await db.query(`select * from topics where id=${ret.insertId}`)
    res.status(201).json(topic)
  } catch (err) {
    next(err)
  }
}

// 修改话题
exports.update = async (req, res, next) => {
  try{
    const id = req.params.id
    const body = req.body
    const sql = `UPDATE topics SET title='${body.title}', content='${body.content}', modify_time='${moment().format('YYYY-MM-DD hh:mm:ss')}' WHERE id=${id}`
    // 执行更新数据
    await db.query(sql)
    // 返回执行后的对应话题数据
    const [updatedTopic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)
    res.status(201).json(updatedTopic)
  } catch (err) {
    next(err)
  }
}

//删除话题
exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id
    // 通过校验，执行删除
    const sql = `DELETE FROM topics WHERE id=${id}`
    const ret = await db.query(sql)
    res.status(201).json({})

  } catch (err) {
    next(err)
  }
}