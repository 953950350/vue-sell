<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
  </div>
</template>


<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimals = score % 1 !== 0
      for (let i = 0; i < Math.floor(score); i++) {
        result.push(CLS_ON)
      }
      if (hasDecimals) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../common/less/mixin.less");
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px; 
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image("../../components/star/star48_on");
      }
      &.half {
        .bg-image("../../components/star/star48_half");
      }
      &.off {
        .bg-image("../../components/star/star48_off");
      }
    }
  }
   &.star36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image("../../components/star/star36_on");
      }
      &.half {
        .bg-image("../../components/star/star36_half");
      }
      &.off {
        .bg-image("../../components/star/star36_off");
      }
    }
  }
   &.star24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 24
      }
      &.on {
        .bg-image("../../components/star/star24_on");
      }
      &.half {
        .bg-image("../../components/star/star24_half");
      }
      &.off {
        .bg-image("../../components/star/star24_off");
      }
    }
  }
}
</style>
