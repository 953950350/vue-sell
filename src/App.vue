<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller" :classMap="classMap"></v-header>
    </div>
    <div class="tab border-1px">
      <router-link tag="div" class="tab-item" to="/goods">商品</router-link>
      <router-link tag="div" class="tab-item" to="/rating">评价</router-link>
      <router-link tag="div" class="tab-item" to="/seller">商家</router-link>
    </div>
    <div class="content">
      <router-view :seller="seller" :classMap="classMap"></router-view>
    </div>
  </div>
</template>

<script>
import header from './components/header/Header.vue'
const ERR_OK = 0
export default {
  data() {
    return {
      seller: {},
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  methods: {
    getSeller() {
      this.$http.get('/api/seller').then(res => {
        if (res.body.errno === ERR_OK) {
          this.seller = res.body.data
        }
      })
    }
  },
  created() {
    this.getSeller()
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="less" scoped>
@import url("./common/less/mixin.less");
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(#ccc);
    .tab-item {
      flex: 1;
      color: rgb(77, 85, 93);
      text-align: center;
      font-size: 14px;
      &.router-active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
