<template>
<!--主体内容-->
<div class="main">
  <div class="container index">
    <!--左侧主体内容-->
    <!--内容顶部栏-->
    <div class="row">
      <div class="content col-md-10 col-sm-12">
        <div class="header">
          <a href="/" class="all now"><span>全部</span></a>
          <a href="#" class="good"><span>精华</span></a>
        </div>
        <!--内容列表-->
        <ul class="list-group">
          <li class="list-group-item" v-for="item in topics">
            <a href="#" class="user_avatar"><img src="../../../public/img/avatar-default.png" alt=""></a>
            <span class="time">{{item.create_time}}</span>
            <div>
              <span class="share">分享</span>
              <router-link :to="{name: 'TopicShow', params: {id: item.id}}">{{item.title}}</router-link>
            </div>
          </li>
        </ul>
        <!-- 分页组件 -->
        <VueBootstrapPage
          :page="page"
          :currentPage="currentPage"
          :canSee="canSee"
          :total="total"
          @handlerChangePage="handlerChangePage"
          />
      </div>
      <!--侧边栏-->
      <div class="sidebar  col-md-2 col-sm-12">
        <div class="hot col-md-12  col-sm-4">
          <a href="#">热门话题 Top100>></a>
          <ul class="list-group">
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
            <li class="list-group-item">热门话题</li>
          </ul>
        </div>
        <div class="answer_no col-md-12  col-sm-4">
          <a href="#">无人回答的话题</a>
          <ul class="list-group">
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
            <li class="list-group-item">文章话题</li>
          </ul>
        </div>
        <div class="app col-md-12 col-sm-4">
          <a href="#">手机二维码</a>
          <div>
            <img src="../../../public/img/er.png" alt="我是二维码">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import axios from 'axios'
  import VueBootstrapPage from '../pageination/VueBootstrapPage.vue'
  export default {
    components: {
      VueBootstrapPage
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.loadTopics()
      })
    },
    data () {
      return {
        topics: [],
        // 总条数
        total: 0,
        // 页数
        pageSize: 20,
        // 总页码
        page: 5,
        // 当前页码
        currentPage: 1,
        // 可视页码数
        canSee: 5
      }
    },
    methods: {
      // 获取话题列表数据
      async loadTopics () {
        const {data} = await axios.get(`/api/topics?_page=${this.currentPage}&_limit=${this.pageSize}`)
        this.topics = data.topics
        this.total = data.count[0].count
        this.page = Math.ceil(this.total / this.pageSize)
      },

      // 点击分页页码 获取对应话题列表数据
      async handlerChangePage (index) {
        this.currentPage = index
        if (this.currentPage < 1) {
            this.currentPage = 1
        }
        if (this.currentPage > this.page) {
            this.currentPage = this.page
        }
        const {data} = await axios.get(`/api/topics?_page=${this.currentPage}&_limit=${this.pageSize}`)
        this.topics = data.topics
      }
    }
  }
</script>
<style>
    @import '../../../public/css/index.css';
</style>