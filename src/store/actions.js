import * as firebase from 'firebase'
import router from '../router'

export default {

  // ADMIN

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
          // dispatch('assignUserRoles', newUser)
        }
      )
      .catch(error => {
        // commit('setLoading', false)
        // commit('setError', error)
        console.log(error)
      })
  },

  signInUser ({ commit }, payload) {
    console.log('chiao')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log('chiao')
        const newUser = {
          id: user.uid
        }
        commit('addUser', newUser)
      })
      .catch(error => {
        console.log('chiao')
        console.log(error)
      })
  },
  autoSignIn ({ commit }, payload) {
    const newUser = {
      id: payload.uid
    }
    commit('addUser', newUser)
  },
  logOut ({ commit }) {
    commit('addUser', null)
    firebase.auth().signOut()
    router.go()
  },
  createUserRoles () {
    const roles = [
      'Admin',
      'Manager',
      'Member',
      'Customer'
    ]
    const ref = firebase.database().ref('roles')
    ref.once('value')
      .then(function (snapshot) {
        if (!snapshot.exists()) {
          roles.forEach(role => {
            ref.push(role)
          })
        }
      })
  },

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

  // MEMBER
  addMember ({ commit, dispatch }, payload) {
    const member = {
      name: payload.name,
      membershipType: payload.membershipType,
      contact: payload.contact,
      emgContact: payload.emgContact,
      approvalStatus: 'Pending',
      dateOfBirth: payload.dateOfBirth,
      occupation: payload.occupation,
      mdclCondition: payload.mdclCondition
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

  assignUserRoles ({ commit }, payload) {
    console.log(payload)
    const id = payload.id
    const role = payload.role
    let data
    let roleId
    const ref = firebase.database().ref('roles')
    ref.orderByValue().equalTo(role).on('value', function (dataSnapshot) {
      data = dataSnapshot.val()
      roleId = Object.keys(data)[0]
      firebase.database().ref('/users/' + roleId + '/').push(id)
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
            address: obj[key].address
          })
        }
        commit('setLoadedMembers', members)
      })
      .catch(error => {
        console.log(error)
      })
  },

  // PAYMENT
  addPayment ({ commit }, payload) {
  }
}
