# 接口文档

## 用户处理

- #### 查询用户

  - 请求方法：`GET`
  - url：`/users`
  - 参数：email , nickname
  - 响应结果：`{} 表示用户不存在`

- #### 添加用户

  - 请求方法：`POST`
  - url：`/users`
  - 参数：`email, password, nickname`
  - 响应结果：``

- #### 修改用户

  - 请求方法：`PATCH`
  - url：`/users`
  - 参数：`id`   （需登录）
  - 响应结果：`用户数据`

- #### 删除用户

  - 请求方法：`delete`
  - url：`/users`
  - 参数：`id`
  - 响应结果： `{}`

## 话题处理

- #### 获取所有话题

  - 请求方法：`GET`

  - url：`/topics`
  - 参数：`_page` 页码(默认:1) , `_limit` 每页数量(默认:20)

- #### 添加话题

  - 请求方法：`POST`

  - url：`/topics`
  - 参数：title 标题 ， content 内容  （需登录）
  - 响应结果：话题数据

- #### 修改话题

  - 请求方法：`PATCH`

  - url：`/topics:id`
  - 参数：topic_id 话题id ， title 标题 ， content 内容  （需登录）

- #### 删除话题

  - 请求方法：`DELETE`

  - url：`/topics:id`
  - 参数：`topic_id 话题id`  （需登录）
  - 返回：成功`{}`

## 评论处理

- #### 获取所有评论

  - 请求方法：`GET`

  - url：`/comments`
  - 参数：`id(评论id 非必须)`
  - 响应结果：评论数据，带id参数则为指定的评论数据

- #### 添加评论

  - 请求方法：`POST`

  - url：`/comments`
  - 参数：`content 评论内容`，`topic_id 评论话题的id`   （需登录）

- #### 删除评论

  - 请求方法：`DELETE`

  - url：`/comments`
  - 参数：`id` 

## 会话管理

- #### 登录

  - 请求方法：`POST`

  - url：`/session`
  - 参数：`email，password`
  - 响应结果：cookie数据

- #### 退出

  - 请求方法：`DELETE`

  - url：`/session`
  - 参数：`无` （需登录）
  - 响应结果：`{}`

- #### 获取登录状态

  - 请求方法：`GET`

  - url：`/session`
  - 参数：`无`  （需登录）



## 头像上传

- #### 上传头像

  + 请求方法：`post`
  + url：`/avatar`
  + 参数：`dataURL(图像数据) ，user_id 用户id` （需登录）
  + 响应结果：`头像文件地址 例:/public/avatarImage/153026_1635165.jpeg`