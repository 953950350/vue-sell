<template>
  <div class="cartcontrol">
    <transition name="decrease">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      ballFlag: false
    }
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    font-size: 24px;
    color: rgb(0, 160, 220);
    line-height: 24px;
    padding: 6px;
    &.decrease-enter,
    &.decrease-leave-to {
      opacity: 0;
      transform: translateX(24px) rotateZ(180deg);
    }
    &.decrease-enter-active,
    &.decrease-leave-active {
      transition: all 0.4s linear;
    }
  }
  .cart-count {
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    vertical-align: top;
    width: 12px;
    text-align: center;
    padding-top: 6px;
  }
  .cart-add {
    display: inline-block;
    font-size: 24px;
    color: rgb(0, 160, 220);
    line-height: 24px;
    padding: 6px;
  }
  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    top: 8px;
    left: 32px;
    z-index: 9999;
    background-color: red;
  }
}
</style>

