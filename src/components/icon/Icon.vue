<template>
  <span :class="description + ' ' + size" class="icon"></span>
</template>

<script>
export default {
  props: {
    description: {
      type: String
    },
    size: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/mixin.less');
.icon {
  &.one {
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: top;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    &.decrease {
      .bg-image("../../components/icon/decrease_1");
    }
    &.discount {
      .bg-image("../../components/icon/discount_1");
    }
    &.guarantee {
      .bg-image("../../components/icon/guarantee_1");
    }
    &.invoice {
      .bg-image("../../components/icon/invoice_1");
    }
    &.special {
      .bg-image("../../components/icon/special_1");
    }
  }
  &.two {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: top;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    &.decrease {
      .bg-image("../../components/icon/decrease_2");
    }
    &.discount {
      .bg-image("../../components/icon/discount_2");
    }
    &.special {
      .bg-image("../../components/icon/special_2");
    }
    &.invoice {
      .bg-image("../../components/icon/invoice_2");
    }
    &.guarantee {
      .bg-image("../../components/icon/guarantee_2");
    }
  }
  &.three {
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: top;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    &.decrease {
      .bg-image("../../components/icon/decrease_3");
    }
    &.discount {
      .bg-image("../../components/icon/discount_3");
    }
    &.guarantee {
      .bg-image("../../components/icon/guarantee_3");
    }
    &.invoice {
      .bg-image("../../components/icon/invoice_3");
    }
    &.special {
      .bg-image("../../components/icon/special_3");
    }
  }
  &.four {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: top;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    &.decrease {
      .bg-image("../../components/icon/decrease_4");
    }
    &.discount {
      .bg-image("../../components/icon/discount_4");
    }
    &.special {
      .bg-image("../../components/icon/special_4");
    }
    &.invoice {
      .bg-image("../../components/icon/invoice_4");
    }
    &.guarantee {
      .bg-image("../../components/icon/guarantee_4");
    }
  }
  
}
</style>
