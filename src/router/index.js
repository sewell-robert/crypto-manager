import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import CreateRecord from '@/components/CreateRecord'
import UserLogin from '@/components/UserLogin'
import UserRegistration from '@/components/UserRegistration'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'User Login',
    component: UserLogin
  },
  {
    path: '/SignUp',
    name: 'User Registration',
    component: UserRegistration
  },
  {
    path: '/AddInvestment',
    name: 'Create Record',
    component: CreateRecord
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
