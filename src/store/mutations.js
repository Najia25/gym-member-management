export default {
  addUser (state, payload) {
    console.log('chiao')
    state.user = payload
  },
  adminExists (state, payload) {
    state.adminExists = payload
  },
  updateMemberData (state, payload) {
    const member = state.members.find(data => {
      return data.id === payload.id
    })

    if (payload.name) {
      member.name = payload.name
    }
    if (payload.contact) {
      member.contact = payload.contact
    }
    if (payload.emgContact) {
      member.emgContact = payload.emgContact
    }
    if (payload.occupation) {
      member.occupation = payload.occupation
    }
    if (payload.mdclCondition) {
      member.mdclCondition = payload.mdclCondition
    }
    if (payload.membershipType) {
      member.membershipType = payload.membershipType
    }
    if (payload.dateOfBirth) {
      member.dateOfBirth = payload.dateOfBirth
    }
    if (payload.membershipFeeAmount) {
      member.membershipFeeAmount = payload.membershipFeeAmount
    }
    if (payload.membershipFeeDate) {
      member.membershipFeeDate = payload.membershipFeeDate
    }
    if (payload.status) {
      member.status = payload.status
    }
  },
  updatePendingMembers (state, payload) {
    state.pendingMembers.splice(state.pendingMembers.findIndex(member => member.id === payload), 1)
  },
  setApprovedMembers (state, payload) {
    state.approvedMembers = payload
  },
  setPendingMembers (state, payload) {
    state.pendingMembers = payload
  },
  setStaffs (state, payload) {
    state.staffs = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setSuccess (state, payload) {
    state.success = payload
  },
  clearError (state) {
    state.error = null
  }
}
