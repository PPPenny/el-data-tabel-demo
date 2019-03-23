<template>
  <div class="layout-list">
  <nuxt></nuxt>
    <copyright></copyright>
  </div>
</template>

<script>
import Copyright from '../components/copyright.vue'
export default {
  name: 'list',
  components: {
    Copyright
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="less">
.layout-list{
    width:100%;
    padding:30px;
}

</style>
