<template>
  <v-dialog
    v-model="paymentDialog"
    max-width="800px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        outlined
        class="mb-5 mt-5 ml-5"
        v-on="on"
        @click="onBtnClick"
      >
      Payment history
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-card-title>
          Transaction History
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allPayments"
          :loading="loadPaymentHistory"
          disable-pagination
          hide-default-footer
        >
          <template v-slot:[`item.status`]="{ item }">
            {{ returnPaymentStatus(item) }}
          </template>
          <template v-slot:[`item.action`]="{ item }" v-if="user.role === 'Admin'">
            <edit-payment-details-dialog :item="item" :id="id"></edit-payment-details-dialog>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-btn @click="paymentDialog = false" color="primary">close</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import EditPaymentDetailsDialog from '@/components/EditPaymentDetailsDialog.vue'
export default {
  name: 'payment-history-dialog',
  props: ['id'],
  components: {
    EditPaymentDetailsDialog
  },
  data () {
    return {
      paymentDialog: false,
      search: '',
      loadPaymentHistory: false
    }
  },
  watch: {
    loading () {
      if (!this.loading) {
        if (this.loadPaymentHistory) {
          this.loadPaymentHistory = false
        }
      }
    }
  },
  computed: {
    ...mapState(['allPayments', 'loading', 'user']),
    // loadingAllPayments () {
    //   if (this.loading && this.loading.type === 'allPayments') {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    headers () {
      const headers = [
        { text: 'Amount', align: 'start', sortable: false, value: 'amount' },
        { text: 'Paid Date', sortable: false, value: 'paid_date' },
        { text: 'Expire Date', sortable: false, value: 'expire_date' },
        { text: 'Description', sortable: false, value: 'description' },
        { text: 'Service Fee', sortable: false, value: 'service_fee' },
        { text: 'Development Fee', sortable: false, value: 'development_fee' },
        { text: 'Status', sortable: false, value: 'status' },
        { text: 'Action', sortable: false, value: 'action' }
      ]
      if (this.user.role === 'Admin') {
        return headers
      } else {
        headers.pop()
        return headers
      }
    }
  },
  methods: {
    onBtnClick () {
      this.$store.dispatch('getAllPayments', this.id)
      this.loadPaymentHistory = this.loading
    },
    returnPaymentStatus (item) {
      if (parseInt(item.status) === 0) {
        return 'Pending'
      } else {
        return 'Approved'
      }
    }
  }
}
</script>
