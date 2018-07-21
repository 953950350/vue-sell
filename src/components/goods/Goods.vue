<template>
    <div class="goods-container">
        <div class="menu-wrapper" v-show="goods.length" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" :class="{'current': index === currentIndex}" :key="index"
                 class="menu-item border-1px" @click="selectMenu($event, index)">
                    <span class="item-text">
                        <icon :size="'three'" v-if="item.type > -1" :description="classMap[item.type]"></icon>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list" v-for="item in goods" :key="item.name" ref="foodList">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li class="food-item border-1px" v-for="food in item.foods" :key="food.name" @click="selectFood(food)">
                            <div class="icon">
                                <img :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc" v-show="food.description">{{food.description}}</p>
                                <div class="extra">
                                    <span class="sellCount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    ￥<span class="now">{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :deliveryPrice="seller.deliveryPrice"
         :minPrice="seller.minPrice" :selectFoods="selectFoods" ref="shopcart"></shopcart>
         <food :food="selectedFood" ref="food" @add="addFood"></food>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import icon from '../icon/Icon'
import shopcart from '../shopcart/ShopCart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'

const ERR_OK = 0
export default {
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
    },
    props: {
        seller: {
            type: Object
        },
        classMap: {
            type: Array
        }
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                probeType: 3,
                click: true
            })
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        selectFood(food) {
            this.selectedFood = food
            this.$refs.food.show()
        },
        _calculateHeight() {
            let height = 0
            let foodList = this.$refs.foodList
            this.listHeight.push(height)
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        addFood(target) {
            this._drop(target)
        },
        _drop(target) {
            // 性能优化
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target)
            })
        },
        selectMenu(event, index) {
            if (!event._constructed) {
                return false
            }
            let foodList = this.$refs.foodList
            let el = foodList[index]
            this.foodsScroll.scrollToElement(el, 300)
        }
    },
    created() {
        this.$http.get('/api/goods').then(res => {
            res = res.body
            if (res.errno === ERR_OK) {
                this.goods = res.data
                this.$nextTick(() => {
                    this._initScroll()
                    this._calculateHeight()
                })
            }
        })
    },
    components: {
        icon,
        shopcart,
        cartcontrol,
        food
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i + 1]
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
            }
            return 0
        },
        selectFoods() {
            let result = []
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count && food.count > 0) {
                        result.push(food)
                    }
                })
            })
            return result
        }
    }
}
</script>

<style lang="less" scoped>
@import url("../../common/less/mixin.less");
.goods-container {
  display: flex;
  position: absolute;
  width: 100%;
  top: 174px;
  bottom: 46px;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      &.current {
        background-color: #fff;
        position: relative;
        z-index: 10;
        margin-top: -1px;
        .item-text {
          .border-none();
          font-weight: 700;
        }
      }
      .icon {
        margin-right: 2px;
      }
      .item-text {
        display: table-cell;
        font-size: 12px;
        color: #07111b;
        vertical-align: middle;
        width: 56px;
        line-height: 14px;
        .border-1px(rgba(7,17,27,0.1));
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    background-color: #fff;
    .food-list {
      .title {
        width: 100%;
        height: 26px;
        background-color: #f3f4f7;
        border-left: 2px solid #d9dde1;
        color: rgb(147, 153, 159);
        line-height: 26px;
        font-size: 12px;
        padding-left: 12px;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          .border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
          img {
            width: 57px;
            height: 57px;
            vertical-align: top;
          }
        }
        .content {
          flex: 1;
          vertical-align: top;
          position: relative;
          .name {
            padding-top: 2px;
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
            margin-bottom: 8px;
          }
          .desc {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
          .extra {
            margin-top: 8px;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            .sellCount {
              margin-right: 12px;
            }
          }
          .price {
            font-size: 10px;
            font-weight: 700;
            line-height: 24px;
            color: rgb(240, 20, 20);
            .now {
              font-size: 14px;
              font-weight: 700;
              margin-right: 8px;
            }
            .old {
              color: rgb(147, 153, 159);
              font-weight: 700;
              text-decoration: line-through;
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            bottom: -6px;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
