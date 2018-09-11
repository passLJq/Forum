import Vue from 'vue'
import App from './App.vue'
import router from './router'


window.app = new Vue({
  el: '#app',
  data: {

  },
  components: {
    App
  },
  template: '<App />',
  router
})