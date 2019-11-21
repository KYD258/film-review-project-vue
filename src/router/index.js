import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminIndex from '@/components/AdminIndex'
import Classify from '@/components/Classify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/',
      name: 'AdminIndex',
      component: AdminIndex
    }
  ]
})
