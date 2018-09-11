<template>
  <div>
    <Header :user="user"/>
    <router-view></router-view>
    <Footer/>  
  </div>
</template>
<script>
  import Header from '../common/header.vue'
  import Footer from '../common/footer.vue'
  import axios from 'axios'

  export default {
    components: {
      Header,
      Footer
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.loadUser()
      })
    },
    data() {
      return {
        user: false
      }
    },
    methods: {
      async loadUser() {
        const {
          data: user
        } = await axios.get(`/api/session`)
      }
    }
  }
</script>

<style></style>