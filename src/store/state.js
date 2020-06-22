import store from './index'
import axios from 'axios'

export default {
  home: [],
  user: null,
  adminExist: axios.get('http://api.zahin.me/api/admincheck')
    .then(response => {
      store.commit('adminExist', response.data)
    }),
  error: null,
  loading: null,
  success: false,
  approvedMembers: [],
  allMembers: [],
  pendingMembers: [],
  allPayments: [],
  pendingPayments: [],
  singleMember: null,
  staffs: [],
  singleStaff: null,
  referenceReport: []
}
