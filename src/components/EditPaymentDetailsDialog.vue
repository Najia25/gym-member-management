<template>
  <v-dialog
  width="500"
  v-model="editDialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" outlined small color="primary">Edit</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-card-title>
          Edit Payment
        </v-card-title>
        <v-card-text>
          <v-text-field
            :counter="4"
            v-model="amount"
            label="Paid amount"
            type="number"
          ></v-text-field>
          <date-picker @passDate="getMonthlyFeePaymentDate" :paid_date="paid_date" label='Payment Date'></date-picker> <!-- emit event and fetch picked date -->
          <date-picker @passDate="getExpiryDate" :expire_date="expire_date" label='Expiry Date'></date-picker>
          <v-text-field
            v-model="description"
            label="Description"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="editDialog = false"
            dark
          >
            Close
          </v-btn>
          <v-btn
            :loading="loadingEditPayment"
            :color="loadingEditPayment ? 'grey lighten-1' : 'primary'"
            :depressed="loadingEditPayment"
            dark
            @click="onSaveChanges"
          >
            Save
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon dark>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue'
import { mapState } from 'vuex'
export default {
  name: 'edit-payment-details-dialog',
  components: {
    DatePicker
  },
  props: ['item', 'id'],
  data () {
    return {
      editDialog: false,
      paid_date: this.item.paid_date,
      expire_date: this.item.expire_date,
      amount: this.item.amount,
      member_id: 0,
      description: this.item.description,
      singleMember: false
    }
  },
  methods: {
    getMonthlyFeePaymentDate (date) {
      this.paid_date = date
    },
    getExpiryDate (date) {
      this.expire_date = date
    },
    onSaveChanges () {
      if (this.id) {
        this.member_id = this.id
        this.singleMember = true
      } else {
        this.member_id = this.item.member_id
      }
      console.log(this.item)
      const payload = {
        id: this.item.id,
        member_id: this.member_id,
        amount: this.amount,
        paid_date: this.paid_date,
        expire_date: this.expire_date,
        description: this.description,
        service_fee: this.getServiceFee,
        development_fee: this.getDevelopmentFee,
        singleMember: this.singleMember
      }
      console.log(payload)
      this.$store.dispatch('updateSinglePaymentData', payload)
    }
  },
  computed: {
    ...mapState(['loading']),
    getServiceFee () {
      return (this.amount * 0.6).toFixed(2)
    },
    getDevelopmentFee () {
      return (this.amount * 0.4).toFixed(2)
    },
    loadingEditPayment () {
      if (this.loading && this.loading.type === 'editPaymentDetails') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    loadingEditPayment () {
      if (!this.loadingEditPayment) {
        this.editDialog = false
      }
    }
  }
}
</script>
