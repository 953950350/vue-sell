import Router from 'vue-router'

import Goods from '../components/goods/Goods.vue'
import Rating from '../components/rating/Rating.vue'
import Seller from '../components/seller/Seller.vue'

export default new Router({
  routes: [{
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/rating',
      component: Rating
    },
    {
      path: '/seller',
      component: Seller
    }
  ],
  linkActiveClass: 'router-active'
})
