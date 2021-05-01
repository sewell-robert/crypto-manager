import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import CreateRecord from '@/components/CreateRecord'
import UserLogin from '@/components/UserLogin'
import UserRegistration from '@/components/UserRegistration'
import PerformanceSnapshot from '@/components/PerformanceSnapshot'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/SignUp',
    name: 'UserRegistration',
    component: UserRegistration
  },
  {
    path: '/AddTransaction',
    name: 'CreateRecord',
    component: CreateRecord
  },
  {
    path: '/PerformanceSnapshot',
    name: 'PerformanceSnapshot',
    component: PerformanceSnapshot
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
