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
                <p>Membership Type:</p>
                <p>{{ member.membership_type }}</p>
                <p>Date Of Birth:</p>
                <p>{{ member.dob }}</p>
                <p>Contact:</p>
                <p>{{ member.contact }}</p>
                <p>Emergency Contact:</p>
                <p>{{ member.emergency_contact }}</p>
                <p>Occupation:</p>
                <p>{{ member.occupation }}</p>
                <p>Medical Condition:</p>
                <p>{{ member.medical_condition }}</p>
                <p>Registration amount:</p>
                <p>{{ member.reg_amount }}</p>
                <p>Registration date:</p>
                <p>{{ member.reg_date }}</p>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <edit-user-details-dialog></edit-user-details-dialog>
            <v-btn color="primary" @click="updatePendingMember" v-if="member.status === 0">Approve</v-btn>
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
                      v-model="amount"
                      label="Paid amount"
                      type="number"
                    ></v-text-field>
                    <!-- <v-text-field
                      :counter="4"
                      label="Due amount"
                      type="number"
                    ></v-text-field> -->
                    <date-picker @passDate="getMonthlyFeePaymentDate" label='Payment Date'></date-picker> <!-- emit event and fetch picked date -->
                    <date-picker @passDate="getExpiryDate" label='Expiry Date'></date-picker>

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
import PaymentHistoryDialog from '@/components/PaymentHistoryDialog.vue'
import EditUserDetailsDialog from '@/components/EditUserDetailsDialog.vue'
import DatePicker from '@/components/DatePicker.vue'
import { mapState } from 'vuex'

export default {
  components: {
    PaymentHistoryDialog,
    EditUserDetailsDialog,
    DatePicker
  },
  props: ['id', 'status'],
  data () {
    return {
      paid_date: new Date().toISOString().substr(0, 10),
      expire_date: new Date().toISOString().substr(0, 10),
      amount: 0
    }
  },
  computed: {
    ...mapState(['members', 'user']),
    member () {
      const payload = {
        id: this.id,
        status: this.status
      }
      return this.$store.getters.loadMember(payload)
    }
  },
  methods: {
    getMonthlyFeePaymentDate (date) {
      this.paid_date = date
    },
    getExpiryDate (date) {
      this.expire_date = date
    },
    updatePendingMember () {
      const payload = {
        status: 1,
        id: this.member.id
      }
      this.$store.dispatch('updatePendingMembers', payload)
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
