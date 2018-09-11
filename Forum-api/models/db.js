/**
 * 封装mysql操作函数
 */

const mysql = require('mysql');
const config = require('../config.js')

// 创建连接池
const pool  = mysql.createPool(config.db)

/**
 * 操作数据库
 * @param sql 语句
 * @returns {Promise<any>} 增删改时返回的是对象，查询时返回的是数组
 */
exports.query = function (sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        return reject(err)
      }
      connection.query(sql, (err, ...args) => {
        // 释放连接池
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(...args)
      })
    })
  })
}

