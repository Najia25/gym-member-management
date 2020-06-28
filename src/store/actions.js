import router from '../router'
import axios from 'axios'

axios.defaults.baseURL = 'http://api.zahin.me/api'

export default {
  getHomeItems ({ commit }) {
    commit('setLoading', true)
    axios.get('/homepage')
      .then(response => {
        commit('setLoading', null)
        commit('setHomePageItems', response.data)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', null)
      })
  },
  getPendingMembers ({ commit }) {
    commit('setLoading', {
      type: 'pendingMembers'
    })
    axios.get('/inactiveMembers')
      .then(response => {
        commit('setLoading', null)
        commit('setPendingMembers', response.data.data)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', null)
      })
  },
  getPendingPayments ({ commit }) {
    commit('setLoading', {
      type: 'pendingPayments'
    })
    axios.get('/pendingPayments')
      .then(response => {
        commit('setLoading', null)
        commit('setpendingPayments', response.data)
      })
      .catch(error => {
        commit('setLoading', null)
        console.log(error)
      })
  },
  getReferenceReport ({ commit }, payload) {
    commit('setLoading', true)
    axios.get(`/referencereport?from=${payload.fromDate}&to=${payload.toDate}`)
      .then(response => {
        commit('setLoading', null)
        commit('setReferenceReport', response.data)
      })
      .catch(error => {
        commit('setLoading', null)
        console.log(error)
      })
  },
  // ADMIN
  getApprovedMembers ({ commit }) {
    commit('setLoading', true)
    axios.get('/activeMembers')
      .then(response => {
        commit('setLoading', null)
        commit('setApprovedMembers', response.data.data)
      })
      .catch(error => {
        commit('setLoading', null)
        console.log(error)
      })
  },
  getAllMembers ({ commit }) {
    commit('setLoading', true)
    axios.get('/members')
      .then(response => {
        commit('setLoading', null)
        commit('setAllMembers', response.data.data)
      })
      .catch(error => {
        commit('setLoading', null)
        console.log(error)
      })
  },
  getAllPayments ({ commit }, payload) {
    commit('setLoading', {
      type: 'allPayments'
    })
    axios.get(`/members/${payload}/payments`)
      .then(response => {
        commit('setLoading', null)
        commit('setAllPayments', response.data.data)
      })
      .catch(error => {
        commit('setLoading', null)
        console.log(error)
      })
  },
  getSingleMember ({ commit }, payload) {
    commit('setLoading', {
      type: 'singleMember'
    })
    axios.get(`/members/${payload}`)
      .then(response => {
        commit('setLoading', null)
        commit('setSingleMember', response.data.data[0])
      })
      .catch(error => {
        commit('setLoading', null)
        console.log(error)
      })
  },
  updatePendingMembers ({ commit }, payload) {
    commit('setLoading', {
      type: 'approveMembers',
      id: payload.id
    })
    commit('clearError')
    commit('setSuccess', false)
    const status = {
      status: payload.status
    }
    axios.patch('/members/' + payload.id, status)
      .then(() => {
        commit('setLoading', null)
        commit('updatePendingMembers', payload.id)
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setLoading', null)
        commit('setError', error)
        console.log(error)
      })
  },
  updateSingleMemberData ({ commit }, payload) {
    commit('setLoading', {
      type: 'editUserDetails'
    })
    commit('clearError')
    commit('setSuccess', false)
    const updateObj = {}
    // console.log(payload)
    if (payload.membership_type) {
      updateObj.membership_type = payload.membership_type
    }
    if (payload.status) {
      updateObj.status = payload.status
    }
    if (payload.name) {
      updateObj.name = payload.name
    }
    if (payload.contact) {
      updateObj.contact = payload.contact
    }
    if (payload.emergency_contact) {
      updateObj.emergency_contact = payload.emergency_contact
    }
    if (payload.dob) {
      updateObj.dob = payload.dob
    }
    if (payload.occupation) {
      updateObj.occupation = payload.occupation
    }
    if (payload.medical_condition) {
      updateObj.medical_condition = payload.medical_condition
    }
    if (payload.reg_amount) {
      updateObj.reg_amount = payload.reg_amount
    }
    if (payload.reg_date) {
      updateObj.reg_date = payload.reg_date
    }
    axios.patch('/members/' + payload.id, updateObj)
      .then(() => {
        // commit('updatePendingMembers', payload.id)
        commit('updateSingleMemberData', payload)
        commit('setLoading', null)
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setLoading', null)
        console.log(error)
        commit('setError', error)
      })
  },
  updatePendingPayments ({ commit }, payload) {
    commit('setLoading', {
      id: payload.id,
      type: 'approvePayments'
    })
    commit('clearError')
    commit('setSuccess', false)
    const status = {
      status: payload.status
    }
    axios.patch(`/members/${payload.member_id}/payments/${payload.id}`, status)
      .then(() => {
        // commit('addApprovedMember', payload)
        commit('setLoading', null)
        commit('setSuccess', true)
        commit('updatePendingPayments', payload.id)
      })
      .catch(error => {
        commit('setLoading', null)
        commit('setError', error)
        console.log(error)
        // commit('setLoading', false)
      })
  },
  updateSinglePaymentData ({ commit }, payload) {
    commit('setLoading', {
      type: 'editPaymentDetails'
    })
    const updateObj = {}
    if (payload.amount) {
      updateObj.amount = payload.amount
    }
    if (payload.paid_date) {
      updateObj.paid_date = payload.paid_date
    }
    if (payload.expire_date) {
      updateObj.expire_date = payload.expire_date
    }
    if (payload.description) {
      updateObj.description = payload.description
    }
    if (payload.service_fee) {
      updateObj.service_fee = payload.service_fee
    }
    if (payload.development_fee) {
      updateObj.development_fee = payload.development_fee
    }
    axios.patch(`/members/${payload.member_id}/payments/${payload.id}`, updateObj)
      .then(() => {
        commit('setLoading', null)
        commit('updateSinglePaymentData', payload)
      })
      .catch(error => {
        commit('setLoading', null)
        console.log(error)
      })
  },
  deleteStaff ({ commit }, payload) {
    const status = {
      status: -1
    }
    axios.patch(`/staffs/${payload.id}`, status)
      .then(() => {
        commit('deleteStaff', payload.id)
      })
      .catch(error => {
        console.log(error)
      })
  },
  updateSingleStaff ({ commit }, payload) {
    const updateObj = {}
    if (payload.email) {
      updateObj.email = payload.email
    }
    if (payload.password) {
      updateObj.password = payload.password
    }
    if (payload.type) {
      updateObj.type = payload.type
    }
    axios.patch(`/staffs/${payload.id}`, updateObj)
      .then(() => {
        commit('updateSingleStaff', payload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  addMember ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    commit('setSuccess', false)
    const member = {
      membership_type: payload.membershipType,
      name: payload.name,
      contact: payload.contact,
      emergency_contact: payload.emgContact,
      dob: payload.dateOfBirth,
      occupation: payload.occupation,
      medical_condition: payload.mdclCondition,
      reg_amount: payload.membershipFeeAmount,
      reg_date: payload.membershipFeeDate,
      staff_id: payload.staff_id,
      status: payload.status
    }
    // let userId
    console.log(member)
    axios.post('/members', member)
      .then(response => {
        commit('setLoading', null)
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setLoading', null)
        commit('setError', error)
        console.log(error)
      })
  },

  adminExists ({ commit }) {
    axios.get('/admincheck')
      .then(response => {
        commit('adminExist', response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  addStaff ({ commit }, payload) {
    commit('clearError')
    commit('setSuccess', false)
    const load = {
      ...payload,
      status: 1
    }
    axios.post('/staffs', load)
      .then(response => {
        commit('setSuccess', true)
        // console.log(response)
      })
      .catch(error => {
        commit('setError', error)
        console.log(error)
      })
  },
  getStaffs ({ commit }) {
    commit('setLoading', true)
    axios.get('/staffs')
      .then(response => {
        commit('setLoading', false)
        commit('setStaffs', response.data.data)
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  signInUser ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    axios.get(`/signin?user=${payload.email}&pass=${payload.password}`)
      .then(response => {
        commit('setLoading', null)
        // console.log(response.data[0])
        const newUser = {
          id: response.data[0].id,
          role: response.data[0].type
        }
        commit('addUser', newUser)
      })
      .catch(error => {
        commit('setLoading', null)
        commit('setError', error)
        console.log(error)
      })
  },

  logOut ({ commit }) {
    commit('addUser', null)
    router.push('/signin')
  },

  // PAYMENT
  addPayment ({ commit }, payload) {
    commit('setLoading', {
      type: 'addPayment'
    })
    commit('clearError')
    commit('setSuccess', false)
    const payment = {
      member_id: payload.id,
      amount: payload.amount,
      paid_date: payload.paid_date,
      expire_date: payload.expire_date,
      description: payload.description,
      service_fee: payload.service_fee,
      development_fee: payload.development_fee,
      status: payload.status
    }
    // let userId
    axios.post(`/members/${payload.id}/payments`, payment)
      .then(response => {
        commit('setLoading', null)
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setLoading', null)
        commit('setError', error)
        console.log(error)
      })
  }
  // clearError ({ commit }) {
  //   commit('clearError')
  // },
  // clearSuccess ({ commit }) {
  //   commit('setSuccess', false)
  // }
}
