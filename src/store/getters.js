export default {
  loadMember (state) {
    return (memberId) => {
      return state.members.find((member) => {
        return member.id === memberId
      })
    }
  },
  loadActiveMembers (state) {
    return state.members.filter(member => {
      return member.status === 'Active' || member.status === 'Inactive'
    })
  },
  loadPendingMembers (state) {
    return state.members.filter(member => {
      return member.status === 'Pending'
    })
  }
}
