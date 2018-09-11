<template>
    <!--注册模块-->
    <div class="register">
        <div class="panel mt_150 text-center">
            <div class="panel-heading">
                <div class="panel-title">
                    <h4>注册</h4>
                </div>
            </div>
            <div class="panel-body">
                
                <form autocomplete="off" id="register_form" @submit.prevent="register">
                    <div class="form-group">
                        <label for="email " class="fll">邮箱</label>
                        <input type="email"
                               name="email"
                               id="email"
                               placeholder="请输入邮箱"
                               class="form-control"
                               autofocus
                               v-model="formData.email"
                               @blur="checkEmail"
                               @input="checkEmail"
                        >
                        <div class="alert alert-danger alert-sm" v-show="error.email">{{message.email}}</div>
                    </div>

                    <div class="form-group">
                        <label for="" class="fll">用户名</label>
                        <input type="text"
                               name="nickname"
                               id="nickname"
                               placeholder="请输入昵称"
                               class="form-control"
                               @blur="checkNickname"
                               @input="checkNickname"
                               v-model="formData.nickname"
                        >
                        <div class="alert alert-danger" v-show="error.nickname">{{message.nickname}}</div>
                    </div>
                    <div class="form-group">
                        <label for="" class="fll">密码</label>
                        <input type="password"
                               name="password"
                               id="password"
                               placeholder="请输入密码"
                               class="form-control"
                               @blur="checkPassword"
                               @input="checkPassword"
                               v-model="formData.password"
                        >
                        <div class="alert alert-danger" v-show="error.password">{{message.password}}</div>
                    </div>
                    <input type="submit" value="注册" class="btn btn-success btn-block" />
                </form>
                <div class="text-right">已有账号? <a href="#/login">点击登录</a></div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'

  export default {
    methods: {
      // 提交表单数据(需通过校验)
      async register() {
        // 提交时再次校验
        this.checkEmail()
        this.checkNickname()
        this.checkPassword()
        if (this.ok.email && this.ok.nickname && this.ok.password) {
          // 校验通过发送数据
        const ret = await axios.post('/api/users', this.formData)
          console.log(ret)
          this.$router.push('/login')
        }
        
      },

      // 邮箱校验
      checkEmail: _.debounce(async function () {
        const exp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        const email = this.formData.email.trim()
        if (!email) {
          this.message.email = '邮箱不能为空'
          this.error.email = true
          this.ok.email = false
          return
        }
        if (!exp.test(email)) {
          this.message.email = '邮箱格式不正确'
          this.error.email = true
          this.ok.email = false
          return
        }
        const ret = await axios.get('/api/users?email=' + email)
        if (ret.data[0]) {
          this.message.email = '邮箱已存在'
          this.error.email = true
          this.ok.email = false
          return
        }
        // 校验通过重置
        this.error.email = false
        this.ok.email = true
      }, 1000),

      // 昵称校验
      checkNickname: _.debounce(async function () {
        const nickname = this.formData.nickname.trim()
        const exp = /^[0-9A-Za-z\u4e00-\u9fa5]{1,12}$/
        if (!nickname) {
          this.message.nickname = '昵称不能为空'
          this.error.nickname = true
          this.ok.nickname = false
          return
        }
        if (!exp.test(nickname)) {
          this.message.nickname = '昵称只能是1-12位数字中文或大小写字母'
          this.error.nickname = true
          this.ok.nickname = false
          return
        }
        
        const ret = await axios.get(`/api/users?nickname=${nickname}`)
        if (ret.data[0]) {
          this.message.nickname = '昵称已存在'
          this.error.nickname = true
          this.ok.nickname = false
          return
        }
        //隐藏报错信息
        this.error.nickname = false

        this.ok.nickname = true
      }, 1000),

      //密码校验
      checkPassword: _.debounce(async function () {
        const psw = this.formData.password 
        if (!psw) { 
          this.message.password = '密码不能为空'
          this.error.password = true
          this.ok.password = false
          return
        }
        if (psw.length < 4 || psw.length > 16) {
          this.message.password = '密码长度必须在4-16位之间'
          this.error.password = true
          this.ok.password = false
          return
        }
        //隐藏报错提示
        this.error.password = false
        //校验通过
        this.ok.password = true
      }, 1000)
    },
    data() {
      return {
        formData: {
          email: '',
          nickname: '',
          password: ''
        },
        //校验提示信息
        message: {
          email: '',
          nickname: '',
          password: ''
        },
        //是否显示提示信息
        error: {
          email: false,
          nickname: false,
          password: false
        },
        //校验是否通过
        ok: {
          email: false,
          nickname: false,
          password: false
        }
      }
    }
  }
</script>

<style>
    @import '../../../public/css/register.css';
    .alert {
      padding: 2px 0;
      margin-top: 10px;
    }
</style>