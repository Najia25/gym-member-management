export default {
  loadMember (state) {
    return (memberId) => {
      return state.members.find((member) => {
        return member.id === memberId
      })
    }
  }
  // getNumberOfUserRoles (state) {
  //   return state.numberOfUserRoles
  // }
}
