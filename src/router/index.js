import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import ActiveMembers from '../views/Members/ActiveMembers.vue'
import PendingMembers from '../views/Members/PendingMembers.vue'
import AddMember from '../views/Members/AddMember.vue'
import Member from '../views/Members/Member.vue'
import PendingPayments from '../views/Payments/PendingPayments.vue'
import AddStaff from '../views/Staff/AddStaff.vue'
import Staff from '../views/Staff/Staff.vue'
import StaffList from '../views/Staff/StaffList.vue'
import Signup from '../views/Signup.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: AuthGuard
  },
  {
    path: '/members/active-members',
    name: 'activemembers',
    component: ActiveMembers,
    beforeEnter: AuthGuard
  },
  {
    path: '/members/pending-members',
    name: 'pendingmembers',
    component: PendingMembers,
    beforeEnter: AuthGuard
  },
  {
    path: '/members/add-member',
    name: 'addmember',
    component: AddMember,
    beforeEnter: AuthGuard
  },
  {
    path: '/payments/pending-payments',
    name: 'pendingpayments',
    component: PendingPayments,
    beforeEnter: AuthGuard
  },
  {
    path: '/staff/add-staff',
    name: 'addstaff',
    component: AddStaff,
    beforeEnter: AuthGuard
  },
  {
    path: '/staff/staff-list',
    name: 'stafflist',
    component: StaffList,
    beforeEnter: AuthGuard
  },
  {
    path: '/staffs/:id',
    name: 'staff',
    component: Staff,
    props: true,
    beforeEnter: AuthGuard
  },
  {
    path: '/members/:id',
    name: 'member',
    component: Member,
    props: true,
    beforeEnter: AuthGuard
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
