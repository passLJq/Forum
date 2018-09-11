<template>
<div class="main">
  <div class="container">
    <div class="col-xs-3">
      <div class="setting">
        <div>用户设置</div>
        <ul>
          <li><a href="#/setting/profile">基本信息</a></li>
          <li class="now"><a href="#">账户设置</a></li>
        </ul>
      </div>
    </div>
    <div class="col-xs-9 profile">
      <hr>
      <form autocomplete="off" id="setting_form" @submit.prevent="postPassword">
        <div class="user_message">
          <div class="form-group user-email">
            <div>账号(邮箱)</div>
            <span>{{user.email}}</span>
          </div>
          <div class="alert alert-danger" style="display: none"></div>
          <div class="alert alert-success" style="display: none"></div>
            <h2><strong>修改密码</strong></h2>
            <div class="alert alert-danger text-center" v-if="message">{{message}}</div>
            <div class="alert alert-success text-center" v-if="successMessage">{{successMessage}}</div>
          <div class="form-group">
            <label for="password">当前密码</label>
            <input type="password" name="password" 
            id="password" class="form-control" 
            v-model="currentPassword">
          </div>

          <div class="form-group">
            <label for="new">新的密码</label>
            <input type="password" name="new" id="new" class="form-control" 
            v-model="newPassword" @input="checkPassword(newPassword, $root)" @blur="checkPassword(newPassword, $root)">
          </div>

          <div class="form-group">
            <label for="confirm">确认密码</label>
            <input type="password" name="confirm" id="confirm" class="form-control" 
            v-model="confirmPassword">
          </div>
          <input class="btn btn-success btn-lg" type="submit" value="保存" />
        </div>
      </form>
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
        // 当前密码
        currentPassword: '',
        // 新密码
        newPassword: '',
        // 确认密码
        confirmPassword: '',
        message: '',
        successMessage:'',
        user: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.isLoginHandler()
      })
    },
    methods: {
      // 判断登录
      async isLoginHandler () {
        try {
          const {data: sessionUser} = await axios.get('/api/session')
          const {data: user} = await axios.get(`/api/users?id=${sessionUser.id}`)
          this.user = user[0]
        } catch (err) {
          this.$router.push('/login')
        }
      },

      checkPassword: _.debounce(function (password, $root) {
        const psw = password.trim()
        if (!psw.length) {
          this.message = '新密码不能为空'
          return
        }
        if (psw.length < 4 || psw.length > 16) {
          this.message = '新密码必须是4-16位'
          return
        }
        this.message = ''
      }, 500),
      
      postPassword: _.debounce(async function() {
        try {
          let newPassword = this.newPassword.trim()
          let confirmPassword = this.confirmPassword.trim()
          // 校验当前密码是否正确
          const {data: user} = await axios.post(`/api/users/psw/${this.user.id}`, {password: this.currentPassword})
          if (user.message) {
            return this.message = '密码错误，请稍后再试'
          }
          // 校验新密码
          this.checkPassword(newPassword)
          // 校验确认密码
          if (newPassword !== confirmPassword) {
            return this.message = '确认密码与新密码不一致'
          }
          // 提交新密码
          const {data: newUser} = await axios.patch(`/api/users/${this.user.id}`, {
            password: newPassword
          })
          this.successMessage = '修改成功'
        } catch (err) {
          this.message = '修改失败，请稍后再试'
        }
        //this.message = '当前密码错误'
      })
    },
    watch: {
      message () {
        setTimeout(() => {
            this.message = ''
          }, 2000)
      },
      successMessage () {
        setTimeout(() => {
            this.successMessage = ''
            this.$router.push('/setting/profile')
          }, 2000)
      }
    }
  }
</script>
<style>
    @import '../../../public/css/setting.css'
</style>