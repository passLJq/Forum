const express = require('express')
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const sessionController = require('./controllers/session')
const commentController = require('./controllers/comment')
const filesController = require('./controllers/files.js')
const db = require('./models/db')
const checkHelper = require('./helper/checkHelper')

const router = express.Router()


/**
 * 用户资源
 */
router
  .get('/users', userController.list)
  .post('/users', userController.create)
  .patch('/users/:id', checkHelper.Login, userController.update)
  .delete('/users/:id', checkHelper.Login, userController.destroy)
  .post('/users/psw/:id', checkHelper.Login, userController.changePassword)
/**
 * 话题资源
 */
router
  .get('/topics', topicController.list)
  .get('/topics/:id', topicController.getOneById)
  .post('/topics', checkHelper.Login, topicController.create)
  .patch('/topics/:id', checkHelper.Login, checkHelper.Topic, topicController.update)
  .delete('/topics/:id', checkHelper.Login, checkHelper.Topic, topicController.destroy)

/**
 * 评论管理
 */
router
  .get('/comments', commentController.list)
  .post('/comments', checkHelper.Login, commentController.create)
  .patch('/comments/:id', checkHelper.Login, commentController.update)
  .delete('/comments/:id', checkHelper.Login, checkHelper.Comment, commentController.destroy)

/**
 * 会话管理
 */
router
  .get('/session', checkHelper.Login, sessionController.get)
  .post('/session', sessionController.create)
  .delete('/session', checkHelper.Login, sessionController.destroy)

/**
 * 头像数据管理
 */
router
  .post('/avatar', checkHelper.Login, filesController.avatar)


module.exports = router
