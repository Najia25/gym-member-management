<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Pending New Members -->
        <v-card class="mb-5">
          <SnackBar :msg="msg"></SnackBar>
          <v-container>
            <v-card-title>
              Pending New Payments
            </v-card-title>
            <v-data-table :headers="headers" :items="pendingPayments"  :loading="loadingTable" loading-text="Loading... Please wait" hide-default-footer disable-pagination>
              <template v-slot:item.name="{ item }">
                <router-link class="black--text text-decoration-none" :to="{ name: 'member', params: { id: item.member_id }}">{{ item.name }}</router-link>
              </template>
              <template v-slot:item.action="{ item }">
                <!-- <v-btn small outlined  color="primary" @click="updatePendingPayment(item)" v-if="user.role === 'Admin'" class="mr-2">Approve</v-btn> -->
                <v-btn
                  :loading="loadingApprove(item)"
                  :disabled="loadingApprove(item)"
                  color="primary"
                  small
                  outlined
                  @click="updatePendingPayment(item)"
                  v-if="user.role === 'Admin'"
                  class="mr-2"
                >
                  Approve
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                  </template>
                </v-btn>
                <!-- <v-btn outlined small color="primary" @click="EditPayment(item)">Edit</v-btn> -->
                <edit-payment-details-dialog :item="item"></edit-payment-details-dialog>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SnackBar from '@/components/SnackBar.vue'
import EditPaymentDetailsDialog from '@/components/EditPaymentDetailsDialog.vue'
export default {
  components: {
    SnackBar,
    EditPaymentDetailsDialog
  },
  computed: {
    ...mapState(['user', 'pendingPayments', 'error', 'success', 'loading']),
    loadingTable () {
      if (this.loading && !this.loading.id) {
        if (this.loading.type === 'pendingPayments') {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  data () {
    return {
      headers: [
        { text: 'Member Id', align: 'center', sortable: false, value: 'member_id' },
        { text: 'Name', align: 'center', sortable: false, value: 'name' },
        { text: 'Contact', align: 'center', sortable: false, value: 'contact' },
        { text: 'Amount', align: 'center', sortable: false, value: 'amount' },
        { text: 'Description', align: 'center', sortable: false, value: 'description' },
        { text: 'Payment Date', align: 'center', sortable: false, value: 'paid_date' },
        { text: 'Expire Date', align: 'center', sortable: false, value: 'expire_date' },
        { text: 'Action', sortable: false, value: 'action' }
      ],
      msg: 'Payment approved'
    }
  },
  created () {
    this.$store.dispatch('getPendingPayments')
    // 26:37 post
  },
  methods: {
    updatePendingPayment (item) {
      const payload = {
        id: item.id,
        member_id: item.member_id,
        status: 1
      }
      this.$store.dispatch('updatePendingPayments', payload)
    },
    loadingApprove (item) {
      if (this.loading && this.loading.id) {
        if (this.loading.type === 'approvePayments' && this.loading.id === item.id) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
}
</script>
<style>
  @media (min-width: 600px) {
    .v-data-table td {
      height: 72px !important;
    }
    .v-application .mr-2 {
      margin-bottom: 5px;
    }
  }
    @media (min-width: 1264px) {
    .v-data-table td {
      height: 48px !important;
    }
    .v-application .mr-2 {
      margin-bottom: 0px;
    }
  }
</style>
