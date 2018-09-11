<template>
<div class="main">
  <div class="container">
    <div class="alert alert-danger message" v-show="message">{{message}}</div>
    <div class="title">发起话题</div>
    <form autocomplete="off" id="new" @submit.prevent="postHandler">
      <div class="form-group">
        <label for="title fll">标题</label>
        <input type="text" 
        id="title"
        v-model="formData.title"
        class="form-control"
        placeholder="请输入标题">
      </div>
      <div class="form-group">
        <label for="content fll">话题内容</label>
        <textarea class="form-control"
        id="content"
        v-model="formData.content"
        cols="30" 
        rows="20"></textarea>
      </div>
      <input type="submit" 
        class="btn btn-success btn-lg flr"
        value="发起">
    </form>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'

  export default {
    data () {
      return {
        message: '',
        formData: {
          title: '',
          content: ''
        }
      }
    },
    methods: {
      postHandler: _.debounce(async function () {
        try {
          if (!this.formData.title) return this.message = '标题不能为空'
          if (!this.formData.content) return this.message = '内容不能为空'

          const {data} = await axios.post('/api/topics', this.formData)
          this.message = ''
          this.$router.push(`/topic/show/${data.id}`)
        } catch (err) {
          this.message = '发起话题失败，请重新尝试！'
        }
      }, 500)
    }
  }
</script>
<style scoped>
  .title {
    font-size: 24px;
    font-weight: 700;
    padding: 15px 0;
  }
  textarea {
    resize: none;
  }
  label {
    font-size: 20px;
    font-weight: 400;
  }
  .message {
    padding: 10px;
  }
</style>