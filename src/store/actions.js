import * as firebase from 'firebase'
import router from '../router'

export default {

  // ADMIN

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
  addMember ({ commit }, payload) {
    const member = {
      name: payload.name,
      membershipType: payload.membershipType,
      contact: payload.contact,
      emgContact: payload.emgContact,
      dateOfBirth: payload.dateOfBirth,
      occupation: payload.occupation,
      mdclCondition: payload.mdclCondition,
      status: payload.status,
      membershipFeeAmount: payload.membershipFeeAmount,
      membershipFeeDate: payload.membershipFeeDate
    }
    let userId
    console.log(member)
    firebase.database().ref('members').push(member)
      .then(data => {
        userId = data.key
        console.log(userId)
        return userId
      })
      .then(() => {
        commit('addMember', {
          ...member,
          id: userId
        })
        // const params = {
        //   id: userId,
        //   role: 'Member'
        // }
        // dispatch('assignUserRoles', params)
      })
      .catch(error => {
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
    if (payload.emgContact) {
      updateObj.emgContact = payload.emgContact
    }
    if (payload.occupation) {
      updateObj.occupation = payload.occupation
    }
    if (payload.mdclCondition) {
      updateObj.mdclCondition = payload.mdclCondition
    }
    if (payload.membershipType) {
      updateObj.membershipType = payload.membershipType
    }
    if (payload.dateOfBirth) {
      updateObj.dateOfBirth = payload.dateOfBirth
    }
    if (payload.membershipFeeAmount) {
      updateObj.membershipFeeAmount = payload.membershipFeeAmount
    }
    if (payload.membershipFeeDate) {
      updateObj.membershipFeeDate = payload.membershipFeeDate
    }
    if (payload.status) {
      updateObj.status = payload.status
    }
    console.log(updateObj)
    firebase.database().ref('members').child(payload.id).update(updateObj)
      .then(() => {
        commit('updateMemberData', payload)
      })
      .catch(error => {
        console.log(error)
        // commit('setLoading', false)
      })
  },

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
  }
}
