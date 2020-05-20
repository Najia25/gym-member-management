import * as firebase from 'firebase'
import router from '../router'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default {

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

  updateMemberData ({ commit }, payload) {
    const updateObj = {}
    console.log(payload)
    if (payload.name) {
      updateObj.name = payload.name
    }
    if (payload.contact) {
      updateObj.contact = payload.contact
    }
    if (payload.dob) {
      updateObj.dob = payload.dob
    }
    if (payload.occupation) {
      updateObj.occupation = payload.occupation
    }
    if (payload.emergency_contact) {
      updateObj.emergency_contact = payload.emergency_contact
    }
    if (payload.membership_type) {
      updateObj.membership_type = payload.membership_type
    }
    if (payload.reg_amount) {
      updateObj.reg_amount = payload.reg_amount
    }
    if (payload.reg_date) {
      updateObj.reg_date = payload.reg_date
    }
    if (payload.status) {
      updateObj.status = payload.status
    }
    if (payload.medical_condition) {
      updateObj.medical_condition = payload.medical_condition
    }
    console.log(updateObj)
    axios.patch('/members/' + payload.id, updateObj)
      .then(() => {
        commit('updateMemberData', payload)
      })
      .catch(error => {
        console.log(error)
        // commit('setLoading', false)
      })
  },
  adminExists ({ commit }) {
    const ref = firebase.database().ref('users').child('Admin')
    ref.once('value')
      .then(function (snapshot) {
        if (snapshot.exists()) {
          commit('adminExists', true)
        }
      })
      .catch(error => {
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

  assignUserRoles ({ commit }, payload) {
    console.log(payload)
    const id = payload.id
    const role = payload.role
    // let data
    // let roleId
    // const ref = firebase.database().ref('roles')
    // ref.orderByValue().equalTo(role).on('value', function (dataSnapshot) {
    //   data = dataSnapshot.val()
    //   roleId = Object.keys(data)[0]
    firebase.database().ref('/users/' + role + '/').push(id)
      .then(() => {
        commit('addUser', { id: id, role: role })
      })
      .catch(err => {
        console.log(err)
      })
    // })
  },

  signInUser ({ dispatch }, payload) {
    console.log('chiao')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        // let role
        console.log(data.user.uid)
        dispatch('fetchUserRole', data.user.uid)
      })
      .catch(error => {
        console.log('chiao')
        console.log(error)
      })
  },

  fetchUserRole ({ commit }, payload) {
    let role
    var ref = firebase.database().ref('users').child('Admin')
    ref.orderByValue().equalTo(payload).on('value', function (dataSnapshot) {
      if (dataSnapshot.val() !== null) {
        role = 'Admin'
      } else {
        role = 'Manager'
      }
      const newUser = {
        id: payload,
        role: role
      }
      commit('addUser', newUser)
    })
  },

  // autoSignIn ({ dispatch }, payload) {
  //   dispatch('fetchUserRole', payload.user.uid)
  // },

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
  },
  clearError ({ commit }) {
    commit('clearError')
  },
  clearSuccess ({ commit }) {
    commit('setSuccess', false)
  }
}
