import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Signin from '@/Signin.vue'
// import ActiveMembers from '../views/Members/ActiveMembers.vue'
// import AllMembers from '../views/Members/AllMembers.vue'
import PendingMembers from '../views/Members/PendingMembers.vue'
import AddMember from '../views/Members/AddMember.vue'
import PendingPayments from '../views/Payments/PendingPayments.vue'
// import AddStaff from '../views/Staff/AddStaff.vue'
// import StaffList from '../views/Staff/StaffList.vue'
import DashView from '@/Dash.vue'
import Report from '@/views/Report/ReferenceReport.vue'
import NotFoundView from '@/404.vue'
import AuthGuard from './auth-guard'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'home',
        name: 'home',
        alias: '',
        component: () => import('../views/Home.vue'),
        beforeEnter: AuthGuard
      },
      // {
      //   path: 'members/all-members',
      //   name: 'allmembers',
      //   component: () => import('../views/Members/AllMembers.vue'),
      //   beforeEnter: AuthGuard
      // },
      {
        path: 'members/active-members',
        name: 'activemembers',
        component: () => import('../views/Members/ActiveMembers.vue'),
        beforeEnter: AuthGuard
      },
      {
        path: 'members/pending-members',
        name: 'pendingmembers',
        component: PendingMembers,
        beforeEnter: AuthGuard
      },
      {
        path: 'members/add-member',
        name: 'addmember',
        component: AddMember,
        beforeEnter: AuthGuard
      },
      {
        path: 'payments/pending-payments',
        name: 'pendingpayments',
        component: PendingPayments,
        beforeEnter: AuthGuard
      },
      {
        path: 'staff/add-staff',
        name: 'addstaff',
        component: () => import('../views/Staff/AddStaff.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.user && store.state.user.role === 'Admin') {
            next()
          } else {
            next('/signin')
          }
        }
      },
      {
        path: 'staff/staff-list',
        name: 'stafflist',
        component: () => import('../views/Staff/StaffList.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.user && store.state.user.role === 'Admin') {
            next()
          } else {
            next('/signin')
          }
        }
      },
      {
        path: 'members/:id',
        name: 'member',
        component: () => import('../views/Members/Member.vue'),
        props: true,
        beforeEnter: AuthGuard
      },
      {
        path: 'reports/reference-report',
        name: 'referencereport',
        component: Report,
        beforeEnter: (to, from, next) => {
          if (store.state.user && store.state.user.role === 'Admin') {
            next()
          } else {
            next('/signin')
          }
        }
      }
    ]
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '*',
    component: NotFoundView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
