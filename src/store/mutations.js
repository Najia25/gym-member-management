export default {
  addAdmin (state, payload) {
    console.log('chiao')
    state.admin = payload
  },
  addMember (state, payload) {
    state.members.push(payload)
  },
  setLoadedMembers (state, payload) {
    state.members = payload
  }
}
