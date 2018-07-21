<template>
    <div class="header-container">
        <div class="content-warpper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}&nbsp;/&nbsp;{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="supports">
                    <icon :size="'one'" :description="classMap[seller.supports[0].type]"></icon>
                    <span class="pay">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" @click="detailShow = true" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="header-notice" @click="detailShow = true">
            <span class="notice-icon"></span><span class="notice-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="header-bg">
            <img :src="seller.avatar" alt="">
        </div>
        <transition>
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <div class="sale-content">
                            <ul>
                                <li v-for="(item, index) in seller.supports" :key="index">
                                    <icon :size="'two'" :description="classMap[item.type]"></icon>
                                    <span class="text">{{item.description}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="notice">
                            {{seller.bulletin}}
                        </div>
                    </div>
                </div>
                <div class="detail-close">
                    <i class="icon-close" @click="detailShow = false"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../star/Star'
import icon from '../icon/Icon'
export default {
  data() {
    return {
      detailShow: false
    }
  },
  components: {
    star,
    icon
  },
  props: {
    seller: {
      type: Object
    },
    classMap: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../common/less/mixin.less");
.header-container {
  color: #fff;
  position: relative;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
  .content-warpper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
    .avatar {
      display: inline-block;
      margin-right: 16px;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      vertical-align: top;
      .title {
        margin-top: 2px;
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: top;
          margin-right: 6px;
          .bg-image("../../components/header/brand");
          background-repeat: no-repeat;
          background-size: 30px 18px;
        }
        .name {
          font-size: 16px;
          line-height: 18px;
        }
      }
      .description {
        padding: 8px 0 10px 0;
        font-size: 12px;
        line-height: 12px;
      }
      .supports {
        .icon {
          margin-right: 4px;
        }
        .pay {
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
    .support-count {
      position: absolute;
      font-size: 0;
      line-height: 24px;
      right: 12px;
      bottom: 15px;
      padding: 0 8px;
      height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      .count {
        font-size: 10px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }
  .header-notice {
    background-color: rgba(7, 17, 27, 0.2);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 20px 0 12px;
    height: 28px;
    line-height: 28px;
    position: relative;
    .notice-icon {
      display: inline-block;
      width: 22px;
      height: 12px;
      vertical-align: top;
      margin-top: 8px;
      .bg-image("../../components/header/bulletin");
      background-size: 22px 12px;
    }
    .notice-text {
      font-size: 10px;
      margin: 0 4px;
      vertical-align: top;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      top: 8px;
      right: 12px;
    }
  }
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
  }
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        width: 100%;
        .name {
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
          text-align: center;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          margin: 28px auto 24px auto;
          width: 80%;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
          }
        }
        .sale-content {
          font-size: 0;
          width: 80%;
          margin: 0 auto;
          ul {
            li {
              margin-bottom: 12px;
              padding: 0 12px;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                margin-right: 6px;
              }
              .text {
                display: inline-block;
                font-size: 12px;
                height: 16px;
                line-height: 16px;
              }
            }
          }
        }
        .notice {
          width: 80%;
          padding: 0 12px;
          margin: 0 auto;
          font-size: 12px;
          line-height: 24px;
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s;
  }
}
</style>
