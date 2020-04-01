export default {
  addUser (state, payload) {
    console.log('chiao')
    state.user = payload
  },
  addMember (state, payload) {
    state.members.push(payload)
  },
  setLoadedMembers (state, payload) {
    state.members = payload
  }
}
