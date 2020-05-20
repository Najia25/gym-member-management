export default {
  loadMember: (state) => (payload) => {
    // return (memberId) => {
    //   return state.pendingMembers.find((member) => {
    //     return member.id === memberId
    //   })
    // }
    if (payload.status === 0) {
      if (state.pendingMembers.filter(member => member.id === payload.id).length > 0) {
        return state.pendingMembers.find(member => {
          return member.id === payload.id
        })
      }
    } else {
      return state.approvedMembers.find(member => {
        return member.id === payload.id
      })
    }
  }
}
