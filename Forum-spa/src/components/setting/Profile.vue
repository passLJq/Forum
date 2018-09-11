<template>
<div class="main">
  <div class="container">
    <div class="col-xs-3">
      <div class="setting">
        <div>用户设置</div>
        <ul>
          <li class="now"><a href="#">基本信息</a></li>
          <li><a href="#/setting/admin">账户设置</a></li>
        </ul>
      </div>
    </div>
    <div class="col-xs-9 profile">
      <hr>
      <form autocomplete="off" id="profile_form" @submit.prevent="postProfile">
        <div class="user_message">
          <div class="form-group user-email">
            <div>账号(邮箱)</div>
            <span>{{user.email}}</span>
          </div>
          <div class="alert alert-danger" v-if="postMessage">{{postMessage}}</div>
          <div class="alert alert-success" v-if="successMessage">{{successMessage}}</div>
          <div class="form-group">
            <label for="nickname">昵称</label>
            <input type="text"
              name="nickname"
              id="nickname"
              class="form-control"
              @input="checkNickname"
              v-model="user.nickname">
          </div>
          <div class="form-group">
            <label for="bio">介绍</label>
            <textarea class="form-control" name="bio" id="bio" cols="30" rows="5" v-model="user.bio"></textarea>
          </div>
          <div class="form-group">
            <label>性别</label>
            保密
            <input type="radio"
              name="gender"
              value="-1"
              @click="changeGender(-1)"
              :checked="gender(-1)" >
              男
            <input type="radio"
              name="gender"
              @click="changeGender(0)"
              value="0"
              :checked="gender(0)">
              女
            <input type="radio"
              name="gender"
              @click="changeGender(1)"
              value="1"
              :checked="gender(1)">
          </div>
          <button class="btn btn-success btn-lg" style="display: block" type="submit">保存</button>
        </div>
      </form>
      <form id="avatar_form">
        <div class="user_avatar">
          <span>头像设置</span>
          <img :src="user.avatar"  alt="头像" >
          <div class="form-group">
            <label class="btn btn-default" for="avatar">更改头像</label>
            <input type="file" 
              name="avatar" 
              id="avatar" 
              accept="image/*"
              @change="avatarChange">
          </div>
        </div>
      </form>
    </div>
  </div>
  <!--模态框-->
  <div class="avatarBox text-center clearfix" v-show="avatarBox" >
    <p>头像剪裁</p>
    <div class="avatarBox-body clearfix" >
      <img :src="localImage" id="image" alt="avatar" v-initCropper>
    </div>
    <div class="avatarBox-footer">
      <button type="button"
        class="btn btn-default btn-sm"
        @click="cancel">取消</button>
      <button type="button"
        class="btn btn-primary btn-sm"
        id="upload"
        @click="commit">确定</button>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  import Cropper from 'cropperjs'

  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.isLoginHandler()
      })
    },  
    data () {
      return {
        user: {},
        postMessage: '',
        successMessage: '',

        // 头像裁切模态框
        avatarBox: false,
        // 模态框里的图像
        avatarImage: '',
        // cropper 实例对象
        cropper: '',
        // dataURL
        url: '',
        croppable: false,
        // 提交文件的files[0]数据
        picValue: '',
        // 图片格式
        imgCropperData: {
          accept: 'image/jpeg, image/png, image/jpg'
        },
        // 存储本地上传的图片dataURL，用以预览裁切
        localImage: '',
        // 存储异步请求的头像地址，动态添加数据
        loadImage: ''
      }
    },
    
    watch: {
      postMessage () {
        setTimeout(() => {
          this.postMessage = ''
        }, 2000)
      },
      successMessage () {
        setTimeout(() => {
          this.successMessage = ''
        }, 2000)
      }
    },
    mounted() {
      // 初始化cropper
      const image = document.getElementById('image')
      this.cropper = new Cropper(image, {
        aspectRatio: 1, //裁切框比例
        resizable: false,
        viewMode: 1,
        background: false,
        movable: true, //是否允许移动剪裁框
        zoomable: true, //是否允许缩放,默认true
        rotatable: false, //是否允许旋转图片
        ready: () => {
          this.croppable = true
        }
      })
    },
    methods: {
      // 判断登录
      async isLoginHandler () {
        try {
          const {data: sessionUser} = await axios.get('/api/session')
          // const {data: user} = await axios.get(`/api/users?id=${sessionUser.id}`)
          this.user = sessionUser
          this.user.avatar = `/api${this.user.avatar}`
        } catch (err) {
          this.$router.push('/login')
        }
      },
      // 判断性别radio
      gender (index) {
        switch (index) {
          case this.user.gender:
          return true
          defaule 
          return false
        }
      },
      // 
      changeGender (index) {
        this.user.gender = index
      },
      // 昵称校验
      checkNickname: _.debounce(async function () {
        const nickname = this.user.nickname.trim()
        const exp = /^[0-9A-Za-z\u4e00-\u9fa5]{1,12}$/
        if (!nickname) {
          this.postMessage = '昵称不能为空'
          return
        }
        if (!exp.test(nickname)) {
          this.postMessage = '昵称只能是1-12位数字中文或大小写字母'
          return
        }
        const {data: user} = await axios.get(`/api/users?nickname=${nickname}`)
        if (user[0].id !== this.user.id) {
          this.postMessage = '昵称已存在'
          return
        }
        this.postMessage = ''
      }, 1000),

      // 提交用户信息
      async postProfile () {
        // 提交时再次验证
        this.checkNickname()
        try {
          const {data: user} = await axios.get('/api/session')
          this.postMessage = ''
        } catch (err) {
          this.postMessage = '验证失败，请重新登录'
        }

        // 提交数据 
        try {
          const {data: user} = await axios.patch(`/api/users/${this.user.id}`, {
            nickname: this.user.nickname,
            gender: this.user.gender,
            bio: this.user.bio
          })
          this.successMessage = '修改成功'
          this.user = user
          this.user.avatar = `/api${this.user.avatar}`
          await setTimeout(() => {
            this.successMessage = ''
          }, 2000)
        } catch (err) {
          this.postMessage = '修改失败，请稍后再试'
        }
      },

      // 以下都是 更换头像的methods方法
      avatarChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let type = files[0].type // 文件类型
        let size = files[0].size // 文件大小

        if (this.imgCropperData.accept.indexOf(type) == -1) {
          return this.postMessage = '请选择图片格式为"jpg、jpeg、png"'
        }
        if (size > 5242880) {
          return this.postMessage = '请选择5M以内的图片'
        }
        this.picValue = files[0]
        this.url = this.getObjectURL(this.picValue)
        // 替换图片重置url
        if (this.cropper) {
          this.cropper.replace(this.url)
        }
        // 读取文件的dataURL数据
        let reader = new FileReader() 
        reader.onload = () => {
          const dataURL = reader.result
          // 预览上传图片
          this.localImage = dataURL
        }
        this.avatarBox = true
      },
      // 创建url路径
      getObjectURL(picValue) {
        let url = null
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(picValue)
        } else if (window.URL != undefined) {
            // firefox
            url = window.URL.createObjectURL(picValue);
        } else if (window.webkitURL != undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(picValue)
        }
        return url
      },
      // 确定
      commit () {
        if (!this.croppable) return
        // 获取当前裁切的canvas标签
        let croppedCanvas = this.cropper.getCroppedCanvas()
        this.avatarImage = croppedCanvas.toDataURL('image/jpeg')
        // 执行上传
        this.postImage()
        // 关闭模态框
        this.avatarBox = false
      },
      // 取消裁切 
      cancel () {
        // 重置参数 隐藏裁切框
        this.avatarBox = false
        this.localImage = ''
        this.cropper = ''
        this.picValue = ''
      },
      async postImage () {
        try {
          const {data: url} = await axios.post(`/api/avatar`, {
            dataURL: this.avatarImage,
            user_id: this.user.id
          })
          // 获取头像新路径
          this.user.avatar = `/api${url.avatar}`
          this.successMessage = '修改头像成功'
        } catch (err) {
          this.postMessage = '修改头像失败，请稍后再试'
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../../public/css/setting.css'
</style>