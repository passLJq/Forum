import Vue from 'vue'
import VueRouter from 'vue-router'
// 界面模块
// 主页
import Home from './components/home/Home.vue'
import Index from './components/home/index.vue'
// 登录 注册 
import Login from './components/user/login.vue'
import Register from './components/user/register.vue'
// 话题
import TopicNew from './components/topic/New.vue'
import TopicShow from './components/topic/Show.vue'
import TopicEdit from './components/topic/Edit.vue'
// 个人设置
import Profile from './components/setting/Profile.vue'
import Admin from './components/setting/Admin.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //home
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          component: Index
        },
        // user
        {
          path: '/login',
          component: Login
        }, 
        {
          path: '/register',
          component: Register
        },
        // topic
        {
          path: '/topic/new',
          component: TopicNew
        }, 
        {
          name: 'TopicShow',
          path: '/topic/show/:id',
          component: TopicShow
        }, 
        {
          name: 'TopicEdit',
          path: '/topic/edit/:id',
          component: TopicEdit
        },
        // settings
        {
          path: '/setting/profile',
          component: Profile
        },
        {
          path: '/setting/admin',
          component: Admin
        }
      ]
    }
  ]
})

// 导出路由
export default router

/*
routes: [
    //home
    {
      path: '/',
      component: Index
    },
    // user
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    // topic
    {
      path: '/topic/new',
      component: TopicNew
    },
    {
      name: 'TopicShow',
      path: '/topic/show/:id',
      component: TopicShow
    },
    {
      name: 'TopicEdit',
      path: '/topic/edit/:id',
      component: TopicEdit
    }
  ]

 */