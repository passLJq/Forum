# Forum话题社区

## 介绍

基于`nodejs`与`vue`的单页面应用程序，通过`express`构建后台路由`api`接口，使后台代码简洁明了易于维护，运用`mysql`对应用数据进行增删改查。

使用bootstrap构建页面样式，利用栅格系统与媒体查询搭建响应式布局。

通过`vue-router`前端路由实现单页面应用程序，实现登录、注册、发表话题、修改话题、删除话题、发表评论、修改用户信息、更换头像（引用第三方js库"cropper"实现用户自由裁切头像图片、异步上传后台并写入保存公共静态资源目录）、通过自定义分页组件利用父子传值实现分页功能等。

自定义配置webpack打包，前后端使用es6语法与async/await方法使代码与异步请求简洁明了，实现模块化编程，具有提高开发效率，易于维护等特性。启用自动代理，便于管理访问api接口。

## 服务端

- ### 结构

  ```
  - Forum-api                --后台api目录
  .
  │  app.js                  --后台应用程序
  │  package-lock.json			 
  │  package.json 					
  │  README.md
  ├─controllers              --路由模块控制程序
  ├─models                   --mysql操作文件
  ├─config.js                --基本配置
  └─routes                   --路由模块
  ```

  ### 服务端

  **NodeJS**

  - express			框架

  - moment                 时间插件

  - blueimp-md5        md5加密插件

  - body-parser          解析post请求体插件

  - mysql                     操作mysql数据库

    

## 客户端

- ### 结构

  ```
  - Forum-spa                   --客户端单页面目录
  .
  │  index.html                 --项目html页面
  │  package-lock.json
  │  package.json               --npm配置文件信息
  │  README.md
  │  webpack.config.js          --webpack配置文件
  │
  ├─dist                        --打包文件
  │
  ├─node_modules                --第三方依赖
  │          
  ├─public                      --公共静态资源目录
  │          
  └─src                         --项目文件
      │  App.vue                --vue主组件
      │  main.js                --应用入口文件
      │  router.js              --vue-router路由程序
      │  
      └─components              --vue组件文件目录
  ```

  ### 客户端第三方插件

  Vue

  + vue-router            构建前端路由
  + bootstrap              css样式
  + axios                       第三方AJAX库
  + lodash                    第三方js库(主要用于函数防抖)
  + cropper                  图像裁切



## 项目截图

![image](http://wx3.sinaimg.cn/large/7b9c392dgy1fv4fiuefc9j20zu0pcq50.jpg)

![image](http://wx3.sinaimg.cn/large/7b9c392dgy1fv4fr0h7muj212i0pddgk.jpg)

![image](http://wx2.sinaimg.cn/large/7b9c392dgy1fv4fr0hbpdj210h0pd0uj.jpg)

![image](http://wx4.sinaimg.cn/large/7b9c392dgy1fv4fr0louzj215d0pcaej.jpg)

![image](http://wx1.sinaimg.cn/large/7b9c392dgy1fv4fr0jq42j212q0pdtgn.jpg)

![image](http://wx1.sinaimg.cn/large/7b9c392dgy1fv4fr0h692j20wu0jj74q.jpg)

![image](http://wx1.sinaimg.cn/large/7b9c392dgy1fv4fr0krcoj20y00es74p.jpg)