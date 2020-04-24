<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto">
        <v-card class="mb-5">
          <v-container>
            <v-card-title>Member details</v-card-title>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="grid-container">
                  <p>Name:</p>
                  <p>{{ member.name }}</p>
                  <p>Membership Type</p>
                  <p>{{ member.membershipType }}</p>
                  <p>Date Of Birth:</p>
                  <p>{{ member.dateOfBirth }}</p>
                  <p>Contact:</p>
                  <p>{{ member.contact }}</p>
                  <p>Emergency Contact:</p>
                  <p>{{ member.emgContact }}</p>
                  <p>Occupation:</p>
                  <p>{{ member.occupation }}</p>
                  <p>Medical Condition:</p>
                  <p>{{ member.mdclCondition }}</p>
                  <p>Status:</p>
                  <p class="status">{{ member.status }}</p>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <edit-user-details-dialog></edit-user-details-dialog>
              <v-btn color="primary" @click="updateStatus()" v-if="member.status === 'Pending'">Approve</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
        <v-card>
          <v-container>
            <v-card-title>
              Monthly payment
            </v-card-title>
            <v-card-text>
              <v-card outlined>
                <v-container>
                  <v-card-text>
                    <v-form @submit.prevent="addPayment">
                      <v-text-field
                        :counter="4"
                        v-model="monthlyFeePaidAmount"
                        label="Paid amount"
                        type="number"
                      ></v-text-field>
                      <!-- <v-text-field
                        :counter="4"
                        label="Due amount"
                        type="number"
                      ></v-text-field> -->
                      <date-picker @passDate="getmonthlyFeePaidDate"></date-picker> <!-- emit event and fetch picked date -->
                      <date-picker @passDate="getMonthlyFeeExpiryDate"></date-picker>
                      <p>{{ daysLeftToExpire }}</p>
                      <v-card-actions>
                        <v-btn color="primary" outlined class="mb-5 mt-5" type="submit">Add payment</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-container>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <payment-history-dialog></payment-history-dialog>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentHistoryDialog from '../components/PaymentHistoryDialog.vue'
import EditUserDetailsDialog from '../components/EditUserDetailsDialog.vue'
import DatePicker from '../components/DatePicker.vue'
import { mapState } from 'vuex'

export default {
  components: {
    PaymentHistoryDialog,
    EditUserDetailsDialog,
    DatePicker
  },
  props: ['id'],
  data () {
    return {
      monthlyFeePaidDate: '',
      monthlyFeeExpiryDate: '',
      monthlyFeePaidAmount: 0
    }
  },
  computed: {
    ...mapState(['members', 'user']),
    member () {
      console.log(this.$store.getters.loadMember(this.id))
      return this.$store.getters.loadMember(this.id)
    },
    // serviceFee () {

    // },
    // developmentFee () {
      
    // },
    // need to fix, todays date has to be system date
    daysLeftToExpire () {
      let today = new Date().toISOString().substr(0, 10)
      const [year, month, day] = today.split('-')
      today = new Date(year, month - 1, day)
      let expiryDate = this.monthlyFeeExpiryDate.split('/')
      expiryDate = new Date(expiryDate[2], expiryDate[0] - 1, expiryDate[1])
      return Math.round((expiryDate - today) / (1000 * 60 * 60 * 24))
    }
  },
  methods: {
    getmonthlyFeePaidDate (monthlyFeePaidDate) {
      this.monthlyFeePaidDate = monthlyFeePaidDate
      console.log(this.monthlyFeePaidDate)
    },
    getMonthlyFeeExpiryDate (monthlyFeeExpiryDate) {
      this.monthlyFeeExpiryDate = monthlyFeeExpiryDate
      console.log(this.monthlyFeeExpiryDate)
    },
    updateStatus () {
      const payload = {
        status: 'Active',
        id: this.member.id
      }
      this.$store.dispatch('updateMemberData', payload)
    },
    addPayment () {
      const payload = {
        monthlyFeePaidAmount: this.monthlyFeePaidAmount,
        monthlyFeePaidDate: this.monthlyFeePaidDate,
        id: this.id
      }
      this.$store.dispatch('addPayment', payload)
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 146px auto;
  grid-column-gap: 20px;
}
.v-application p:nth-child(odd) {
  font-weight: 500;
}
.status {
  color:rgba(29, 211, 29, 0.911);
}
/* Chrome, Safari, Edge, Opera */
/* .v-input .v-input__control .v-input__slot .v-text-field__slot input[type=number]#input-85::-webkit-outer-spin-button, .v-input .v-input__control .v-input__slot .v-text-field__slot input[type=number]#input-85::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
} */
input#input-85 {
  -moz-appearance: textfield;
}
</style>
