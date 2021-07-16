import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/congrate-page',
    name: 'paymentConfirmedPage',
    component: () => import(/* webpackChunkName: "payment" */ '../views/About.vue')
  },
  {
    path: '/id',
    name: 'IDcards',
    component: () => import(/* webpackChunkName: "ID" */ '../views/Idcards.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
