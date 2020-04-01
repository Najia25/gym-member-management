import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Registration from '../views/Registration.vue'
import User from '../views/User.vue'
import Admin from '../views/Admin.vue'
import AdminSignUp from '../views/AdminSignUp.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: AuthGuard
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    beforeEnter: AuthGuard
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User,
    props: true,
    beforeEnter: AuthGuard
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/signup',
    name: 'AdminSignUp',
    component: AdminSignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
