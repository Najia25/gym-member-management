<template>
<v-container>
  <v-row>
    <v-col cols="12" sm="8" class="mx-auto">
      <div class="progress text-center">
        <v-progress-circular
          indeterminate
          color="amber"
          v-if="loadingSingleMember"
          size="70"
          width="7"
        ></v-progress-circular>
      </div>
      <div class="card-wrapper" v-if="!loadingSingleMember">
        <v-card class="mb-5">
          <v-container>
            <v-card-title>Member details</v-card-title>
                <v-card-text>
                <div class="grid-container">
                  <p>Member ID:</p>
                  <p>{{ id }}</p>
                  <p>Name:</p>
                  <p>{{ singleMember.name }}</p>
                  <p>Membership Type:</p>
                  <p>{{ singleMember.membership_type }}</p>
                  <p>Date Of Birth:</p>
                  <p>{{ singleMember.dob }}</p>
                  <p>Contact:</p>
                  <p>{{ singleMember.contact }}</p>
                  <p>Emergency Contact:</p>
                  <p>{{ singleMember.emergency_contact }}</p>
                  <p>Occupation:</p>
                  <p>{{ singleMember.occupation }}</p>
                  <p>Medical Condition:</p>
                  <p>{{ singleMember.medical_condition }}</p>
                  <p>Registration amount:</p>
                  <p>{{ singleMember.reg_amount }}</p>
                  <p>Registration date:</p>
                  <p>{{ singleMember.reg_date }}</p>
                  <p>Reference:</p>
                  <p>{{ singleMember.reference}}</p>
                </div>
                </v-card-text>
            <v-card-actions>
              <edit-user-details-dialog :singleMember="singleMember"></edit-user-details-dialog>
              <v-btn color="primary" @click="updatePendingMember" v-if="checkMemberStatus">Approve</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
<!-- Monthly payment -->
        <v-card>
          <v-container>
            <v-card-title>
              Monthly payment
            </v-card-title>
            <v-card-text>
              <v-card outlined>
                <v-container>
                  <v-card-text>
                    <v-form @submit.prevent="addPayment" ref="form">
                      <v-text-field
                        :counter="4"
                        v-model="amount"
                        label="Paid amount"
                        type="number"
                      ></v-text-field>
                      <!-- <v-text-field
                        :counter="4"
                        label="Due amount"
                        type="number"
                      ></v-text-field> -->
                      <date-picker @passDate="getMonthlyFeePaymentDate" :paid_date="paid_date" label='Payment Date'></date-picker> <!-- emit event and fetch picked date -->
                      <date-picker @passDate="getExpiryDate" :allowedDates="allowedDates" :expire_date="expire_date" label='Expiry Date'></date-picker>
                      <v-text-field
                        v-model="description"
                        label="Description"
                      ></v-text-field>
                      <v-card-actions>
                        <!-- <v-btn color="primary" outlined class="mb-5 mt-5" type="submit">Add payment</v-btn> -->
                        <v-btn
                          :loading="loadingAddPayment"
                          :disabled="loadingAddPayment"
                          color="primary"
                          outlined
                          class="mb-5 mt-5"
                          type="submit"
                        >
                          Add payment
                          <template v-slot:loader>
                            <span class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span>
                          </template>
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-container>
              <SnackBar :msg="msg"></SnackBar>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <payment-history-dialog :id="id"></payment-history-dialog>
            </v-card-actions>
          </v-container>
        </v-card>
      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import PaymentHistoryDialog from '@/components/PaymentHistoryDialog.vue'
import EditUserDetailsDialog from '@/components/EditUserDetailsDialog.vue'
import DatePicker from '@/components/DatePicker.vue'
import SnackBar from '@/components/SnackBar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    PaymentHistoryDialog,
    EditUserDetailsDialog,
    DatePicker,
    SnackBar
  },
  props: ['id'],
  data () {
    return {
      paid_date: new Date().toISOString().substr(0, 10),
      expire_date: new Date().toISOString().substr(0, 10),
      amount: 0,
      status: 0,
      description: '',
      msg: 'Member Data Edited succesfully'
    }
  },
  computed: {
    ...mapState(['user', 'singleMember', 'loading', 'error', 'success']),
    checkMemberStatus () {
      if (this.user.role === 'Admin' && parseInt(this.singleMember.status) === 0) {
        return true
      } else {
        return false
      }
    },
    getServiceFee () {
      return (this.amount * 0.6).toFixed(2)
    },
    getDevelopmentFee () {
      return (this.amount * 0.4).toFixed(2)
    },
    allowedDates () {
      if (this.paid_date) {
        const date = new Date(this.paid_date)
        date.setUTCDate(date.getUTCDate() + 1)
        return date.toISOString().slice(0, 10)
      } else {
        return undefined
      }
    },
    loadingSingleMember () {
      if (this.loading && this.loading.type === 'singleMember') {
        return true
      } else {
        return false
      }
    },
    loadingAddPayment () {
      if (this.loading && this.loading.type === 'addPayment') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    success () {
      if (this.success) {
        this.$refs.form.reset()
      }
    }
  },
  created () {
    this.$store.dispatch('getSingleMember', this.id)
  },
  methods: {
    getMonthlyFeePaymentDate (date) {
      this.paid_date = date
    },
    getExpiryDate (date) {
      this.expire_date = date
    },
    updatePendingMember () {
      this.msg = 'Member approved'
      const payload = {
        status: 1,
        id: this.singleMember.id
      }
      this.$store.dispatch('updateSingleMemberData', payload)
    },
    addPayment () {
      this.msg = 'Payment added'
      const payload = {
        amount: this.amount,
        paid_date: this.paid_date,
        id: this.id,
        expire_date: this.expire_date,
        description: this.description,
        status: this.status,
        service_fee: this.getServiceFee,
        development_fee: this.getDevelopmentFee
      }
      this.$store.dispatch('addPayment', payload)
      // this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
.grid-container {
display: grid;
grid-template-columns: auto auto;
grid-column-gap: 20px;
}
.v-application p:nth-child(odd) {
font-weight: 500;
}
</style>
