<template>
  <div class="index">
    <img class="home-img" :src="$store.state.meta.homePageImg" alt="homeImg" />
    <el-button
            type="primary"
            @click="goList"
            size="medium"
            >跳转到列表页面去</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
      goList(){
          this.$router.push({
          path:'/el-data-table',
      })
    }
      }
  }

</script>
<style lang="less">
.index {
  .home-img {
    width: 100%;
  }
}
</style>