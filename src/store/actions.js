import router from '../router'
import axios from 'axios'

axios.defaults.baseURL = 'http://api.najiaafrin.com/api'

export default {
  getPendingMembers ({ commit }) {
    commit('setLoading', true)
    axios.get('/inactiveMembers')
      .then(response => {
        commit('setLoading', false)
        commit('setPendingMembers', response.data.data)
      })
      .catch(() => {
        commit('setLoading', false)
      })
  },
  getPendingPayments ({ commit }) {
    commit('setLoading', true)
    axios.get('/pendingPayments')
      .then(response => {
        commit('setLoading', false)
        commit('setpendingPayments', response.data)
      })
      .catch(() => {
        commit('setLoading', false)
      })
  },
  getReferenceReport ({ commit }, payload) {
    commit('setLoading', true)
    axios.get(`/referencereport?from=${payload.fromDate}&to=${payload.toDate}`)
      .then(response => {
        commit('setLoading', null)
        commit('setReferenceReport', response.data)
      })
      .catch(() => {
        commit('setLoading', null)
      })
  },
  // ADMIN
  getAllPayments ({ commit }, payload) {
    commit('setLoading', true)
    axios.get(`/members/${payload}/payments`)
      .then(response => {
        commit('setLoading', false)
        commit('setAllPayments', response.data.data)
      })
      .catch(() => {
        commit('setLoading', false)
      })
  },
  getSingleMember ({ commit }, payload) {
    commit('setLoading', true)
    axios.get(`/members/${payload}`)
      .then(response => {
        commit('setLoading', false)
        commit('setSingleMember', response.data.data[0])
      })
      .catch(() => {
        commit('setLoading', false)
      })
  },
  updatePendingMembers ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    commit('setSuccess', false)
    const status = {
      status: payload.status
    }
    axios.patch('/members/' + payload.id, status)
      .then(() => {
        commit('setLoading', false)
        commit('updatePendingMembers', payload.id)
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  updateSingleMemberData ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    commit('setSuccess', false)
    const updateObj = {}
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
        commit('setLoading', false)
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  updatePendingPayments ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    commit('setSuccess', false)
    const status = {
      status: payload.status
    }
    axios.patch(`/members/${payload.member_id}/payments/${payload.id}`, status)
      .then(() => {
        // commit('addApprovedMember', payload)
        commit('setLoading', false)
        commit('setSuccess', true)
        commit('updatePendingPayments', payload.id)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        // commit('setLoading', false)
      })
  },
  updateSinglePaymentData ({ commit }, payload) {
    commit('setLoading', true)
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
        commit('setLoading', false)
        commit('updateSinglePaymentData', payload)
      })
      .catch(() => {
        commit('setLoading', false)
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
      .catch(() => {})
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
    axios.post('/members', member)
      .then(response => {
        commit('setLoading', null)
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setLoading', null)
        commit('setError', error)
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
      .then(() => {
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setError', error)
      })
  },
  getStaffs ({ commit }) {
    commit('setLoading', true)
    axios.get('/staffs')
      .then(response => {
        commit('setLoading', false)
        commit('setStaffs', response.data.data)
      })
      .catch(() => {
        commit('setLoading', null)
      })
  },
  signInUser ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    axios.get(`/signin?user=${payload.email}&pass=${payload.password}`)
      .then(response => {
        commit('setLoading', null)
        const newUser = {
          id: response.data[0].id,
          role: response.data[0].type
        }
        commit('addUser', newUser)
      })
      .catch(error => {
        commit('setLoading', null)
        commit('setError', error)
      })
  },

  logOut ({ commit }) {
    commit('addUser', null)
    router.push('/signin')
  },

  // PAYMENT
  addPayment ({ commit }, payload) {
    commit('setLoading', true)
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
        commit('setLoading', false)
        commit('setSuccess', true)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  }
}
