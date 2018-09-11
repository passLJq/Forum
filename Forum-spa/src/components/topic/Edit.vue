<template>
<div class="main">
  <div class="container">
    <div class="alert alert-danger message" v-show="message">{{message}}</div>
    <div class="title">编辑话题</div>
    <form autocomplete="off" id="new" @submit.prevent="editHandler">
      <div class="form-group">
        <label for="title fll">标题</label>
        <input type="text" 
        id="title"
        v-model="topic.title"
        class="form-control"
        placeholder="请输入标题">
      </div>
      <div class="form-group">
        <label for="content fll">话题内容</label>
        <textarea class="form-control"
        id="content"
        v-model="topic.content"
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
        topic: {}
      }
    },
    created () {
      this.loadTopic()
    },
    methods: {
      editHandler: _.debounce(async function () {
        try {
          if (!this.topic.title) return this.message = '标题不能为空'
          if (!this.topic.content) return this.message = '内容不能为空'

          const {data} = await axios.patch(`/api/topics/${this.topic.id}`, this.topic)
          this.message = ''
          this.$router.push(`/topic/show/${data.id}`)
        } catch (err) {
          this.message = '修改话题失败，请重新尝试！'
        }
      }, 500),
      async loadTopic() {
        const {id} = this.$route.params
        const {data: topic} = await axios.get(`/api/topics/${id}`)
        this.topic = topic
      }
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