import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateRecord from '@/views/CreateRecord'
import UserLogin from '@/views/UserLogin'
import UserRegistration from '@/views/UserRegistration'
import PerformanceSnapshot from '@/views/PerformanceSnapshot'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
