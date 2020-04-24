export default {
  addUser (state, payload) {
    console.log('chiao')
    state.user = payload
  },
  adminExists (state, payload) {
    state.adminExists = payload
  },
  addMember (state, payload) {
    state.members.push(payload)
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
  setLoadedMembers (state, payload) {
    state.members = payload
  }
}
