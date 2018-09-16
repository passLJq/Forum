<template>
      <div class="main">
      <div class="container">
        <div class="topic col-sm-9">
          <div class="row">
            <div class="title">
            <h1>{{topic.title}}</h1>
            <span class="detail">
              • 发布于 {{topic.create_time}} • 作者 {{user.nickname}}
            </span>
            <router-link 
            :to="{name: 'TopicEdit', params: {id: topic.id}}"
             v-if="userOpera"
             class="glyphicon glyphicon-pencil btn btn-xs btn-primary"></router-link>
            <a href="#" @click.prevent="deleteTopic" v-if="userOpera" class="glyphicon glyphicon-trash btn btn-xs btn-danger"></a>

          </div>
          <div class="content">{{topic.content}}</div>
          <div class="comment" v-if="allComments[0]">
            <ul class="list-group">
              <div class="header">评论</div>
              <li class="list-group-item" v-for="item in allComments">
                <div class="avatar"><img :src="item.avatar"></div>
                <p>{{item.user_nickname}}</p>
                <span>{{item.content}}</span>
                <div class="opera"> 
                  <a href="#" class="btn btn-primary btn-xs">回复</a>
                </div>
              </li>
            </ul>
          </div>
          <div class="addComment" v-if="showComment">
            <form autocomplete="off" @submit.prevent="commentHandler">
              <div class="form-group">
                <div class="alert alert-danger text-center" v-show="commentMessage">{{commentMessage}}</div>
                <label for="addContent">添加评论</label>
                <textarea id="addContent" v-model="comment.content" cols="10" rows="2" style="resize: none" class="form-control"></textarea>
              </div>
              <input type="submit" class="btn btn-success btn-sm flr" value="评论">
            </form>
          </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="row">
            <div class="author">
              <p>作者</p>
              <div><a href="#"><img :src="user.avatar">{{user.nickname}}</a></div>
            </div>
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
        // 加载评论数据
        allComments: [],
        // 提交的评论数据
        comment: {
          topic_id: '',
          content: ''
        },
        // 评论失败提示信息
        commentMessage: '',
        // 异步话题数据
        topic: {},
        // 异步作者数据
        user: {},
        // 用户操作权限
        userOpera: false,
        // 是否显示 添加评论框
        showComment: true
      }
    },
    async beforeRouteEnter (to, req, next) {
      const {id: topicId} = to.params
      next(vm => {
        vm.loadDetail(topicId)
        vm.loadComments(topicId)
      })
    },
    methods: {
      // 加载话题数据
      async loadDetail (id) {
        const {data: topic} = await axios.get(`/api/topics/${id}`)
        const {data: user} = await axios.get(`/api/users?id=${topic.user_id}`)
        try {
          this.topic = topic 
          this.user = user[0]
          this.user.avatar = `/api${this.user.avatar}`
          const {data: sessionUser} = await axios.get('/api/session')
          if (sessionUser) {
            this.userOpera = sessionUser.id === this.user.id ? true : false
          }
        } catch (err) {
          this.showComment = false
        }
      },
      // 删除话题
      async deleteTopic () {
        if (!window.confirm('确定删除?')) return
        const ret = await axios.delete(`/api/topics/${this.topic.id}`)
        this.$router.push('/')
      },
      
      // 加载评论
      async loadComments (topicId, $data) {
        const {data: comments} = await axios.get(`/api/comments?topic_id=${topicId}`)
        this.allComments = comments
        // 遍历获取评论用户数据
        comments.forEach(async (item, i) => {
          const {data: user} = await axios.get(`/api/users?id=${item.user_id}`)
          this.allComments[i].user_nickname = user[0].nickname
          this.allComments[i].avatar = `/api${user[0].avatar}`
          // 解决v-for数据更新不渲染
          this.$forceUpdate()
        })
      },

      // 加载评论的用户数据
      async loadCommUser (comment) {
        const {data: user} = await axios.get(`/api/users?id=${comment.user_id}`)
        comment.user_nickname = user[0].nickname
        comment.avatar = `/api${user[0].avatar}`
        return comment
      },

      // 添加评论
      async commentHandler () {
        try {
          if (!this.comment.content) return this.commentMessage = '评论内容不能为空！'
          const sessionUser = await axios.get('/api/session')
          this.comment.topic_id = this.topic.id
          const {data: comment} = await axios.post('/api/comments', this.comment)
          // 
          const newComm = await this.loadCommUser(comment)
          this.allComments.push(newComm)
          // 重置评论框
          this.comment.content = ''
        } catch (err) {
          console.dir(err)
          if (err.response.status === 401) {
            return this.commentMessage = '登录验证失败，请重新登录！'
          }
          this.commentMessage = '评论失败，请重新再试！'
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-bottom: 120px;
  }

  .topic .title {
    margin-top: 10px;
    background-color: #fff;
    border-radius: 3px 3px 0 0;
    padding: 25px 10px 5px 10px;

  }

  .topic .title h1 {
    font-size: 22px;
    font-weight: 700;
    margin: 0;
  }

  .topic .title .detail {
    font-size: 12px;
    font-weight: 400;
    color: #666;
    display: block;
    margin-top: 8px;
  }

  .topic .content {
    padding: 15px;
    border-top: 1px solid #ccc;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
  }

  .topic .comment {
    background-color: #fff;
    border-radius: 3px;
    margin-top: 30px;
  }

  .topic .comment ul {
    width: 100%;
  }
  
  .topic .comment ul .header{
    background-color: #f6f6f6;
    height: 30px;
    line-height: 15px;
    padding: 10px 15px;
    border-radius: 3px 3px 0 0;
  }

  .topic .comment ul li {
    width: 100%;
    display: block;
    border: 0;
    border-top: 1px solid #f6f6f6;
    padding-bottom: 30px;
  }

  .topic .comment ul li .avatar{
    width: 100%;
    display: block;
  }

  .topic .comment ul li .avatar img{
    width: 30px;
    height: 30px;
    float: left;
    margin-right: 10px;
  }

  .topic .comment ul li p {
    display: inline-block;
  }

  .topic .comment ul li span {
    padding-left: 5%;
    display: block;
  }
  
  .topic .comment ul li .opera {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -11px;
  }

  .author {
    width: 100%;
    margin: 10px;
    display: block;
  }
    
  .author p {
    margin: 0;
    width: 100%;
    height: 30px;
    font-size: 12px;
    padding: 0 10px;
    line-height: 30px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }

  .author div {
    background-color: #fff;
    border-radius: 0 0 3px 3px;
    padding: 15px 15px 30px 15px;
  }

  .author div a img{
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin-right: 10px;
    display: inline-block;
  }

  .author div a {
    color: #000;
  }
</style>