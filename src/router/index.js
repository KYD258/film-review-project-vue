import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminIndex from '@/components/AdminIndex'
import myCollection from '@/components/myCollection'
import order from '@/components/order'
import creation from '@/components/creation'
import userUpdate from '@/components/userUpdate'
import mySubscription from '@/components/mySubscription'
import myCreation from '@/components/myCreation'
import shop from '@/components/shop'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'AdminIndex',
      component: AdminIndex
    },
    {
      path: '/userUpdate',
      name: 'userUpdate',
      component: userUpdate
    },
    {
      path: '/mySubscription',
      name: 'mySubscription',
      component: mySubscription
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      component: myCollection
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/creation',
      name: 'creation',
      component: creation
    },
    {
      path: '/myCreation',
      name: 'myCreation',
      component: myCreation
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    }
  ]
})
