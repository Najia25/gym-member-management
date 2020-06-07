import store from './index'
import axios from 'axios'

export default {
  home: [],
  user: null,
  adminExist: axios.get('http://127.0.0.1:8000/api/admincheck')
    .then(response => {
      console.log(response.data)
      store.commit('adminExist', response.data)
    })
    .catch(error => {
      console.log(error)
    }),
  error: null,
  loading: false,
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
