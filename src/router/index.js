import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '@/Signin.vue'
import ActiveMembers from '../views/Members/ActiveMembers.vue'
import AllMembers from '../views/Members/AllMembers.vue'
import PendingMembers from '../views/Members/PendingMembers.vue'
import AddMember from '../views/Members/AddMember.vue'
import Member from '../views/Members/Member.vue'
import PendingPayments from '../views/Payments/PendingPayments.vue'
import AddStaff from '../views/Staff/AddStaff.vue'
import StaffList from '../views/Staff/StaffList.vue'
import Signup from '@/Signup.vue'
import DashView from '@/Dash.vue'
import Report from '@/views/Report/ReferenceReport.vue'
import NotFoundView from '@/404.vue'
import AuthGuard from './auth-guard'
// import store from '../store'

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
        component: Home,
        beforeEnter: AuthGuard
      },
      {
        path: 'members/all-members',
        name: 'allmembers',
        component: AllMembers,
        beforeEnter: AuthGuard
      },
      {
        path: 'members/active-members',
        name: 'activemembers',
        component: ActiveMembers,
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
        component: AddStaff,
        beforeEnter: AuthGuard
      },
      {
        path: 'staff/staff-list',
        name: 'stafflist',
        component: StaffList,
        beforeEnter: AuthGuard
      },
      {
        path: 'members/:id',
        name: 'member',
        component: Member,
        props: true,
        beforeEnter: AuthGuard
      },
      {
        path: 'reports/reference-report',
        name: 'referencereport',
        component: Report,
        beforeEnter: AuthGuard
      }
    ]
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '*',
    component: NotFoundView
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
