<template>
  <transition name="food">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
        </div>
        <div class="content">
          <h1 class="name">{{food.name}}</h1>
          <div class="extra">
            <span class="sell-count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new-price">￥{{food.price}}</span>
            <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="control-wrapper">
            <cartcontrol :food="food" @add="addFood"></cartcontrol>
          </div>
          <transition name="buy">
            <div class="buy" v-show="!food.count || food.count < 1" @click="addFirst">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="food-info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <div class="info">
            {{food.info}}
          </div>
        </div>
        <split v-show="food.info"></split>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import Vue from 'vue'
import split from '../split/split'
export default {
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      Vue.set(this.food, 'count', 1)
      this.$emit('add', event.target)
    },
    addFood(target) {
      this.$emit('add', target)
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartcontrol,
    split
  }
}
</script>

<style lang="less" scoped>
.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background-color: #fff;
  &.food-enter,
  &.food-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  &.food-enter-active,
  &.food-leave-active {
    transition: all 0.4s linear;
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    // 当padding-top为100%时它的值是和width保持一致
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content {
    padding: 18px;
    position: relative;
    .name {
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }
    .extra {
      margin: 8px 0 18px 0;
      font-size: 10px;
      color: rgb(147, 153, 159);
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      font-size: 0;
      .new-price {
        font-size: 10px;
        font-weight: 700;
        line-height: 24px;
        color: rgb(240, 20, 20);
        margin-right: 8px;
      }
      .old-price {
        font-size: 10px;
        font-weight: 700;
        line-height: 24px;
        color: rgb(147, 153, 159);
        text-decoration: line-through;
      }
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      line-height: 24px;
      height: 24px;
      box-sizing: border-box;
      padding: 0 12px;
      z-index: 10;
      background-color: rgb(0, 160, 220);
      &.buy-enter,
      &.buy-leave-to {
        opacity: 0;
      }
      &.buy-enter-active,
      &.buy-leave-active {
        transition: all 0.4s linear;
      }
    }
    .control-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
  }
  .food-info {
    padding: 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 6px;
    }
    .info {
      font-size: 12px;
      padding: 0 8px;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
  }
}
</style>

