<template>
<!--登录模块-->
<div class="main">
  <div class="container">
    <div class="col-md-10  col-xs-12 login" >
      <div class="row">
        <ol class="breadcrumb">
          <li><a href="#/">主页</a></li>
          <li class="active">登录</li>
        </ol>
      </div>
      <form autocomplete="off" id="login_form" @submit.prevent="loginHandler">
        <div class="alert alert-danger text-center" v-show="errorMessage">{{errorMessage}}</div>
        <div class="form-group">
          <label for="email " class="fll">邮箱</label>
          <input type="email"
          name="email"
          id="email"
          placeholder="请输入邮箱"
          class="form-control" v-model="formData.email">
        </div>
        <div class="form-group">
          <label for="" class="fll">密码</label>
          <input type="password"
          name="password"
          id="password"
          placeholder="请输入密码"
          class="form-control"
          v-model="formData.password">
        </div>
        
        <br>
        <button type="submit" class="btn btn-success btn-block">登录</button>
        <a href="#" class="flr">忘记密码?</a>
      </form>
    </div>
    <div class="col-md-2 col-xs-12">
      <div class="about">
        <div>关于</div>
        <p>在这里可以:</p>
        <ul>
          <li>提出问题</li>
          <li>帮助解答</li>
          <li>分享知识</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'

  export default {
    data () {
      return {
        formData: {
          email: 'passljq@admin.com',
          password: 123456
        },
        errorMessage: ''
      }
    },
    async created () {
      try {
        const {data: sessionUser} = await axios.get('/api/session')
        this.$router.push('/')
      } catch (err) {

      }
    },
    methods: {
      loginHandler: _.debounce(async function () {
        try {
          const ret = await axios.post('/api/session', this.formData)
          this.errorMessage = ''
          this.$router.go(0)
        } catch (err) {
          switch (err.response.status) {
            case 404:
              this.errorMessage = '登录失败，请重新尝试！'
              break
          }
        }
      }, 500)
    }
  }
</script>

<style scoped>
    @import '../../../public/css/login.css';
</style>