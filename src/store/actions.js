import * as firebase from 'firebase'
import router from '../router'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default {
  getHomeItems ({ commit }) {
    axios.get('/homepage')
      .then(response => {
        console.log(response.data)
        commit('setHomePageItems', response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getPendingMembers ({ commit }) {
    axios.get('/inactiveMembers')
      .then(response => {
        console.log(response.data.data)
        commit('setPendingMembers', response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getPendingPayments ({ commit }) {
    axios.get('/pendingPayments')
      .then(response => {
        console.log(response.data)
        commit('setpendingPayments', response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  // ADMIN
  getApprovedMembers ({ commit }) {
    axios.get('/activeMembers')
      .then(response => {
        console.log(response.status)
        commit('setApprovedMembers', response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getAllPayments ({ commit }, payload) {
    axios.get(`/members/${payload}/payments`)
      .then(response => {
        console.log(response)
        commit('setAllPayments', response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getSingleMember ({ commit }, payload) {
    commit('setLoading', true)
    axios.get(`/members/${payload}`)
      .then(response => {
        commit('setLoading', false)
        console.log(response.data.data)
        commit('setSingleMember', response.data.data)
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  updatePendingMembers ({ commit }, payload) {
    commit('clearError')
    commit('setSuccess', false)
    const status = {
      status: payload.status
    }
    axios.patch('/members/' + payload.id, status)
      .then(() => {
        // commit('addApprovedMember', payload)
        commit('setSuccess', true)
        commit('updatePendingMembers', payload.id)
      })
      .catch(error => {
        commit('setError', error)
        console.log(error)
        // commit('setLoading', false)
      })
  },
  updatePendingPayments ({ commit }, payload) {
    commit('clearError')
    commit('setSuccess', false)
    const status = {
      status: payload.status
    }
    axios.patch(`/members/${payload.member_id}/payments/${payload.id}`, status)
      .then(() => {
        // commit('addApprovedMember', payload)
        commit('setSuccess', true)
        commit('updatePendingPayments', payload.id)
      })
      .catch(error => {
        commit('setError', error)
        console.log(error)
        // commit('setLoading', false)
      })
  },
  updateSinglePaymentData ({ commit }, payload) {
    const updateObj = {}
    console.log(payload)
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
        commit('updateSinglePaymentData', payload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  addMember ({ commit }, payload) {
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
      status: payload.status
    }
    // let userId
    console.log(member)
    axios.post('/members', member)
      .then(response => {
        commit('setSuccess', true)
        console.log(response)
      })
      .catch(error => {
        commit('setError', error)
        console.log(error)
      })
  },

  updateSingleMemberData ({ commit }, payload) {
    const updateObj = {}
    console.log(payload)
    if (payload.membership_type) {
      updateObj.membership_type = payload.membership_type
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

    console.log(updateObj)
    axios.patch('/members/' + payload.id, updateObj)
      .then(() => {
        commit('updateSingleMemberData', payload)
      })
      .catch(error => {
        console.log(error)
        // commit('setLoading', false)
      })
  },
  adminExists ({ commit }) {
    commit('setLoading', true)
    axios.get('/admincheck')
      .then(response => {
        commit('setLoading', false)
        if (response.data === 1) {
          commit('adminExists', true)
        } else {
          commit('adminExists', false)
        }
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  addStaff ({ commit }, payload) {
    commit('setSuccess', false)
    commit('clearError')
    axios.post('/staffs', payload)
      .then(response => {
        commit('setSuccess', true)
        console.log(response)
      })
      .catch(error => {
        commit('setError', error)
        console.log(error)
      })
  },
  getStaffs ({ commit }) {
    axios.get('/staffs')
      .then(response => {
        console.log(response.status)
        commit('setStaffs', response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  signUpUser ({ commit, dispatch }, payload) {
    // commit('setLoading', true)
    // commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        data => {
          // commit('setLoading', false)
          const newUser = {
            id: data.user.uid,
            role: payload.role
          }
          console.log(newUser.id)
          commit('addUser', newUser)
          dispatch('assignUserRoles', newUser)
        }
      )
      .catch(error => {
        // commit('setLoading', false)
        // commit('setError', error)
        console.log(error)
      })
  },

  signInUser ({ commit }, payload) {
    commit('clearError')
    axios.get(`/signin?user=${payload.email}&pass=${payload.password}`)
      .then(response => {
        // commit('setLoading', false)
        console.log(response.data[0])
        const newUser = {
          role: response.data[0].type
        }
        commit('addUser', newUser)
      })
      .catch(error => {
        commit('setError', true)
        console.log(error)
      })
  },

  logOut ({ commit }) {
    commit('addUser', null)
    firebase.auth().signOut()
    router.push('/signin')
  },

  // MEMBER
  loadMembers ({ commit }) {
    firebase.database().ref('members').once('value')
      .then(data => {
        const members = []
        const obj = data.val()
        console.log(obj)
        for (const key in obj) {
          members.push({
            name: obj[key].name,
            id: key,
            contact: obj[key].contact,
            status: obj[key].status,
            dateOfBirth: obj[key].dateOfBirth,
            emgContact: obj[key].emgContact,
            mdclCondition: obj[key].mdclCondition,
            membershipFeeAmount: obj[key].membershipFeeAmount,
            membershipFeeDate: obj[key].membershipFeeDate,
            membershipType: obj[key].membershipType,
            occupation: obj[key].occupation
          })
        }
        commit('setLoadedMembers', members)
      })
      .catch(error => {
        console.log(error)
      })
  },

  // createUserRoles () {
  //   const roles = [
  //     'Admin',
  //     'Manager',
  //     'Member',
  //     'Customer'
  //   ]
  //   const ref = firebase.database().ref('roles')
  //   ref.once('value')
  //     .then(function (snapshot) {
  //       if (!snapshot.exists()) {
  //         roles.forEach(role => {
  //           ref.push(role)
  //         })
  //       }
  //     })
  // },

  // loadUserRoles ({ commit }) {
  //   firebase.database().ref('roles').once('value')
  //     .then(data => {
  //       const roles = []
  //       console.log(data)
  //       const obj = data.val()
  //       console.log(obj)
  //       for (const key in obj) {
  //         roles.push({
  //           id: key,
  //           description: obj[key]
  //         })
  //       }
  //       commit('loadUserRoles', roles)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // },

  // PAYMENT
  addPayment ({ commit }, payload) {
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
    console.log(payment)
    axios.post(`/members/${payload.id}/payments`, payment)
      .then(response => {
        commit('setSuccess', true)
        console.log(response)
      })
      .catch(error => {
        commit('setError', error)
        console.log(error)
      })
  },
  clearError ({ commit }) {
    commit('clearError')
  },
  clearSuccess ({ commit }) {
    commit('setSuccess', false)
  }
}
