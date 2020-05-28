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
          disable-pagination
          hide-default-footer
        >
          <template v-slot:item.status="{ item }">
            {{ item.status === 0 ? "Pending" : "Approved" }}
          </template>
          <!-- <template v-slot:item.action="{ item }">
            <edit-payment-details-dialog :item="item"></edit-payment-details-dialog>
          </template> -->
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
// import EditPaymentDetailsDialog from '@/components/EditPaymentDetailsDialog.vue'
export default {
  name: 'payment-history-dialog',
  props: ['id'],
  // components: {
  //   EditPaymentDetailsDialog
  // },
  data () {
    return {
      paymentDialog: false,
      search: '',
      headers: [
        { text: 'Amount', align: 'start', sortable: false, value: 'amount' },
        { text: 'Paid Date', sortable: false, value: 'paid_date' },
        { text: 'Expire Date', sortable: false, value: 'expire_date' },
        { text: 'Description', sortable: false, value: 'description' },
        { text: 'Service Fee', sortable: false, value: 'service_fee' },
        { text: 'Development Fee', sortable: false, value: 'development_fee' },
        { text: 'Status', sortable: false, value: 'status' }
        // { text: 'Action', sortable: false, value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState(['allPayments'])
  },
  methods: {
    onBtnClick () {
      this.$store.dispatch('getAllPayments', this.id)
    }
  }
}
</script>
