import Vue from 'vue'
import Router from 'vue-router'
import IpList from '@/components/IpList'
import IpBlock from '@/components/IpBlock'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IpBlock',
      component: IpBlock
    }
  ],
  linkExactActiveClass: "is-active"
})
