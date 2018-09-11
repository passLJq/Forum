<template>
<div class="topBar clearfix">
  <div class="container">
    <a href="#/" class="brand"><img src="../../../public/img/logo.png" alt=""></a>
    <div class="search">
      <input type="search" class="form-control">
      <i></i>
    </div>
    <ul id="navBar">
      <template  v-if="isLogin">
      <li><img :src="avatar" height="100" width="100" alt=""></li>
      <li class="user_setting">
        <a href="/profile" class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">个人设置<span class="caret"></span></a>
        <ul class="dropdown-menu" >
          <li><a href="#/setting/profile">基本信息</a></li>
          <li><a href="#/setting/admin">账户设置</a></li>
          <li><a href="#" @click.prevent="logout">退出</a></li>
        </ul>
      </li>
      </template>
      
      <template  v-else>
      <li><a href="#/register">注册</a></li>
      <li><a href="#/login">登录</a></li>
      </template>
      
      <li><a href="#/">首页</a></li>
      <li><a href="#/topic/new">发起</a></li>
    </ul>
  </div>
</div>
</template>
<script>
  import axios from 'axios'
  export default {
    props: ['user'],
    data() {
      return {
        isLogin: false,
        avatar: ''
      }
    },
    created() {
      this.handlerIsLogin()
    },
    methods: {
      // 判断是否登陆
      async handlerIsLogin() {
        try {
          const {
            data: sessionUser
          } = await axios.get('/api/session')
          this.isLogin = true
          this.avatar = `/api${sessionUser.avatar}`
        } catch (err) {

        }
      },

      // 用户登出
      async logout() {
        try {
          const ret = await axios.delete('/api/session')
          this.isLogin = false
          this.$router.push('/login')
        } catch (err) {

        }
      }
    }
  }
</script>
<style scoped>
  .user_setting:hover .dropdown-menu {
    display: block
  }
</style>