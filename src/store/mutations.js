export default {
  setHomePageItems (state, payload) {
    state.home = payload
  },
  addUser (state, payload) {
    state.user = payload
  },
  updateSingleMemberData (state, payload) {
    const member = state.singleMember

    if (payload.membership_type) {
      member.membership_type = payload.membership_type
    }
    if (payload.status) {
      member.status = payload.status
    }
    if (payload.name) {
      member.name = payload.name
    }
    if (payload.contact) {
      member.contact = payload.contact
    }
    if (payload.emergency_contact) {
      member.emergency_contact = payload.emergency_contact
    }
    if (payload.dob) {
      member.dob = payload.dob
    }
    if (payload.occupation) {
      member.occupation = payload.occupation
    }
    if (payload.medical_condition) {
      member.medical_condition = payload.medical_condition
    }
    if (payload.reg_amount) {
      member.reg_amount = payload.reg_amount
    }
    if (payload.reg_date) {
      member.reg_date = payload.reg_date
    }
  },
  updateSinglePaymentData (state, payload) {
    let payment = {}
    if (payload.singleMember) {
      payment = state.allPayments.find(payment => {
        return payment.id === payload.id
      })
    } else {
      payment = state.pendingPayments.find(payment => {
        return payment.id === payload.id
      })
    }
    // const payment = state.allPayments.find(payment => {
    //   return payment.id === payload.id
    // })
    if (payload.amount) {
      payment.amount = payload.amount
    }
    if (payload.paid_date) {
      payment.paid_date = payload.paid_date
    }
    if (payload.expire_date) {
      payment.expire_date = payload.expire_date
    }
    if (payload.description) {
      payment.description = payload.description
    }
    if (payload.service_fee) {
      payment.service_fee = payload.service_fee
    }
    if (payload.development_fee) {
      payment.development_fee = payload.development_fee
    }
  },
  updateSingleStaff (state, payload) {
    const staff = state.staffs.find(staff => {
      return staff.id === payload.id
    })
    if (payload.email) {
      staff.email = payload.email
    }
    if (payload.password) {
      staff.password = payload.password
    }
    if (payload.type) {
      staff.type = payload.type
    }
  },
  updatePendingMembers (state, payload) {
    state.pendingMembers.splice(state.pendingMembers.findIndex(member => member.id === payload), 1)
  },
  updatePendingPayments (state, payload) {
    state.pendingPayments.splice(state.pendingPayments.findIndex(payment => payment.id === payload), 1)
    // state.singleMember.status = 1
  },
  deleteStaff (state, payload) {
    state.staffs.splice(state.staffs.findIndex(staff => staff.id === payload), 1)
    // state.singleMember.status = 1
  },
  setApprovedMembers (state, payload) {
    state.approvedMembers = payload
  },
  setReferenceReport (state, payload) {
    state.referenceReport = payload
  },
  setAllMembers (state, payload) {
    state.allMembers = payload
  },
  setAllPayments (state, payload) {
    state.allPayments = payload
  },
  setPendingMembers (state, payload) {
    state.pendingMembers = payload
  },
  setpendingPayments (state, payload) {
    state.pendingPayments = payload
  },
  setSingleMember (state, payload) {
    state.singleMember = payload
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
  },
  setLoading (state, payload) {
    state.loading = payload
  }
}
