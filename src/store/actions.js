import * as firebase from 'firebase'
import router from '../router'

export default {

  // ADMIN

  signInUser ({ commit }, payload) {
    console.log('chiao')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(admin => {
        console.log('chiao')
        const newAdmin = {
          id: admin.uid
        }
        commit('addAdmin', newAdmin)
      })
      .catch(error => {
        console.log('chiao')
        console.log(error)
      })
  },
  autoSignIn ({ commit }, payload) {
    const newAdmin = {
      id: payload.uid
    }
    commit('addAdmin', newAdmin)
  },
  logOut ({ commit }) {
    commit('addAdmin', null)
    firebase.auth().signOut()
    router.go()
  },

  // MEMBER
  addMember ({ commit }, payload) {
    const member = {
      name: payload.name,
      contact: payload.contact,
      dateOfRegistration: payload.dateOfRegistration,
      status: 'inactive'
    }
    let key
    let imageUrl
    console.log(member)
    firebase.database().ref('members').push(member)
      .then(data => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        console.log(ext)
        return firebase.storage().ref('members/' + key + ext).put(payload.image)
      })
      .then(filedata => {
        return filedata.ref.getDownloadURL()
      })
      .then(data => {
        imageUrl = data
        return firebase.database().ref('members').child(key).update({ imageUrl: imageUrl })
      })
      .then(() => {
        commit('addMember', {
          ...member,
          id: key,
          imageUrl: imageUrl
        })
      })
      .catch(error => {
        console.log(error)
      })
  },

  loadMembers ({ commit }) {
    firebase.database().ref('members').once('value')
      .then(data => {
        const members = []
        const obj = data.val()
        for (const key in obj) {
          members.push({
            name: obj[key].name,
            id: key,
            contact: obj[key].contact,
            dateOfRegistration: obj[key].dateOfRegistration,
            status: obj[key].status,
            imageUrl: obj[key].imageUrl
          })
        }
        commit('setLoadedMembers', members)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
