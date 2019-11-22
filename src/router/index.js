import Vue from 'vue'
import Router from 'vue-router'
import AdminIndex from '@/components/AdminIndex'
import Classify from '@/components/Classify'
import myCollection from '@/components/myCollection'
import order from '@/components/order'
import creation from '@/components/creation'
import userUpdate from '@/components/userUpdate'
import mySubscription from '@/components/mySubscription'
import myCreation from '@/components/myCreation'
import shop from '@/components/shop'
import userIndex from '@/components/userIndex'
import videoDetail from '@/components/videoDetail'
import VideoPlay from '@/components/VideoPlay'
import search from '@/components/search'
import login from '@/components/login'
import register from '@/components/register'
import applyText from '@/components/applyText'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/VideoPlay/:videoId',
      name: 'VideoPlay',
      component: VideoPlay
    },
    {
      path: '/AdminIndex',
      path: '/AdminIndex',
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
    },
    {path: '/', name: 'userIndex', component: userIndex},
    {path: '/applyText', name: 'applyText', component: applyText},
    {path: '/videoDetail/:videoId', name: 'videoDetail', component: videoDetail},
    {path: '/search/:key', name: 'search', component: search},
    {path: '/videoDetail/:videoId', name: 'videoDetail', component: videoDetail},
    {path: '/login', name: 'login', component: login},
    {path: '/register', name: 'register', component: register}
  ]
})
