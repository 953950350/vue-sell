<template>
  <div>
    <div class="shopcart">
      <div class="content">
       <div class="content-left" @click="toggleList">
         <div class="logo-wrapper">
           <div class="logo" :class="{'heightLight': totalCount>0}">
             <i class="icon-shopping_cart" :class="{'heightLight': totalCount>0}"></i>
           </div>
           <div class="num" id="ball-target" v-show="totalCount>0">
             {{totalCount}}
           </div>
         </div>
         <div class="price" :class="{'heightLight': totalCount>0}">
           ￥{{totalPrice}}
         </div>
         <div class="desc">
           另需配送费￥{{deliveryPrice}}元
         </div>
       </div>
       <div class="content-right">
         <div class="pay" :class="payClass">
           {{payDesc}}
         </div>
       </div>
      </div>
      <div class="ball-container">
         <transition v-for="(ball, index) in balls" :key="index" 
          name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
           <div class="ball" v-show="ball.show">
             <div class="inner inner-hook"></div>
           </div>
         </transition>
      </div>
      <transition name="shopList">
         <div class="shopcart-list" v-show="listShow">
           <div class="list-header">
             <h1 class="title">购物车</h1>
             <p class="empty" @click="empty">清空</p>
           </div>
           <div class="list-conent" ref="listContent">
             <ul>
               <li class="item border-1px" v-for="food in selectFoods" :key="food.name">
                 <span class="name">{{food.name}}</span>
                 <div class="cartcontrol-wrappre">
                   <cartcontrol :food="food" @add="addFood"></cartcontrol>
                 </div>
                 <span class="price">￥{{food.price * food.count}}</span>
               </li>
             </ul>
           </div>
         </div>
      </transition>
   </div>
   <transition name="mask">
     <div class="list-mask" @click="listHide" v-show="listShow">
     </div>
   </transition>
</div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    cartcontrol
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  computed: {
    totalPrice() {
      let price = 0
      this.selectFoods.forEach((food) => {
        price += food.price * food.count
      })
      return price
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let dff = this.minPrice - this.totalPrice
        return `还差￥${dff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        this.fold = true
        return
      }
      this.fold = !this.fold
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    listHide() {
      this.fold = true
    },
    addFood(target) {
      this.drop(target)
    },
    beforeDrop(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vas */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../common/less/mixin.less");
.shopcart {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  height: 48px;
  width: 100%;
  .content {
    display: flex;
    background-color: #141d27;
    .content-left {
      flex: 1;
      .logo-wrapper {
        width: 56px;
        height: 56px;
        padding: 6px;
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        border-radius: 50%;
        margin: 0 12px;
        position: relative;
        top: -10px;
        background-color: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2b343c;
          text-align: center;
          &.heightLight {
            background-color: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            font-size: 24px;
            color: rgba(255, 255, 255, 0.4);
            line-height: 44px;
            &.heightLight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          height: 16px;
          width: 24px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
          background-color: rgb(240, 20, 20);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        font-size: 16px;
        font-weight: 700;
        height: 24px;
        line-height: 24px;
        margin-top: 12px;
        padding-right: 12px;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 0.4);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        &.heightLight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
        line-height: 24px;
        margin: 12px 0 0 12px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        text-align: center;
        line-height: 48px;
        height: 48px;
        &.not-enough {
          background-color: #2b333b;
        }
        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
    &.shopList-enter,
    &.shopList-leave-to {
      transform: translate3d(0, 0, 0);
    }
    &.shopList-enter-active,
    &.shopList-leave-active {
      transition: all 1s;
    }
    .list-header {
      width: 100%;
      padding: 0 18px;
      height: 40px;
      box-sizing: border-box;
      background-color: #f3f5f7;
      border-bottom: 2px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        line-height: 40px;
        font-size: 14px;
        font-weight: 200;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
        line-height: 40px;
      }
    }
    .list-conent {
      padding: 0 18px;
      background-color: #fff;
      max-height: 217px;
      overflow: hidden;
      .item {
        padding: 12px 0;
        position: relative;
        .border-1px(rgba(7, 17, 27, 0.1));
        .name {
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 24px;
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          font-size: 14px;
          line-height: 24px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .cartcontrol-wrappre {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}
.list-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  background-color: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(10px);
  &.mask-enter, &.mask-leave-to {
    opacity: 0;
  }
  &.mask-enter-avtive, &.mask-leave-active {
    transition: all 0.4s linear
  }
}
</style>

