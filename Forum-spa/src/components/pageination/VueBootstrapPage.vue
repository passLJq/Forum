<template>
<nav>
  <ul class="pagination">
    <li>
      <a href="#" @click="changePage(currentPage - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li :class="{active: isCurrentPage(index)}" v-for="index in pageCount">
      <a href="#"
        @click="changePage(index)">
        {{index}}
      </a>
    </li>
    <li>
      <a href="#" @click="changePage(currentPage + 1)">
        <span>&raquo;</span>
      </a>
    </li>
    <li style="border: none;color:#666;" disabled><span>总页数：{{page}} 页</span></li>
  </ul>
</nav>
</template>
<script>
  export default {
    props: {
      // 总页码
      page: {
        type: Number,
        required: true
      },
      // 当前页码
      currentPage: {
        type: Number,
        default: 1,
      },
      // 可视页码数
      canSee: {
        type: Number,
        required: true
      },
      // 总条数
      total: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        // 页面显示的分页页码
        pageCount: []
      }
    },
    created () {
      this.getPageCount()
    },
    methods: {
      // 计算分页
      getPageCount () {
        let pageArr = []
        let pageStart = this.currentPage - (this.canSee - 1) / 2
        let pageEnd = pageStart + this.canSee - 1

        pageStart = pageStart < 1 ? 1 : pageStart
        pageEnd = pageStart + this.canSee - 1
        pageEnd = pageEnd > this.page ? this.page : pageEnd
        pageStart = pageEnd - this.canSee + 1
        pageStart = pageStart < 1 ? 1 : pageStart
        for (let i=pageStart;i<=pageEnd;i++) {
          pageArr.push(i)
        }
        this.pageCount = pageArr
      },
      // 判断页码按钮是否当前页码
      isCurrentPage (index) {
        const isCurrent = index === this.currentPage ? true : false
        return isCurrent
      },
      changePage (index) {
        this.$emit('handlerChangePage', index)
      }
    }
  }
</script>
<style>
.pagination {
  margin: 0 0 20px 15px;
}
</style>