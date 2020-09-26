<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Pending New Members -->
        <v-card class="mb-5">
          <SnackBar :msg="msg" :timeOut="timeOut"></SnackBar>
          <v-container>
            <v-card-title>
              Pending New Members
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
              </v-text-field>
            </v-card-title>
            <v-data-table :search="search" :headers="headers" :items="pendingMembers"  :loading="loadingTable" loading-text="Loading... Please wait" disable-pagination hide-default-footer>
              <template v-slot:[`item.name`]="{ item }">
                <router-link class="black--text text-decoration-none" :to="{ name: 'member', params: { id: item.id }}">{{ item.name }}</router-link>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn
                  :loading="loadingApprove(item)"
                  :disabled="loadingApprove(item)"
                  color="primary"
                  small
                  @click="updatePendingMember(item)"
                  class="mb-2 mt-2 mr-2"
                  v-if="user.role === 'Admin'"
                >
                  Approve
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                  </template>
                </v-btn>
                <print-memo :item="item"></print-memo>
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
export default {
  components: {
    SnackBar,
    PrintMemo: () => import('@/components/PrintMemo.vue')
  },
  computed: {
    ...mapState(['user', 'pendingMembers', 'error', 'success', 'loading'])
  },
  data () {
    return {
      msg: 'Member approved',
      timeOut: 3000,
      search: '',
      loadingTable: false,
      loadingItemId: 0,
      headers: [
        { text: 'Id', align: 'center', sortable: false, value: 'id' },
        { text: 'Name', align: 'center', sortable: false, value: 'name' },
        { text: 'Contact', align: 'center', sortable: false, value: 'contact' },
        { text: 'Date of Birth', align: 'center', sortable: false, value: 'dob' },
        { text: 'Emergency Contact', align: 'center', sortable: false, value: 'emergency_contact' },
        { text: 'Membership Type', align: 'center', sortable: false, value: 'membership_type' },
        { text: 'Registration amount', align: 'center', sortable: false, value: 'reg_amount' },
        { text: 'Registration date', align: 'center', sortable: false, value: 'reg_date' },
        { text: 'Reference', align: 'center', sortable: false, value: 'reference' },
        { text: 'Action', sortable: false, value: 'action' }
      ]
    }
  },
  watch: {
    loading () {
      if (!this.loading) {
        if (this.loadingTable) {
          this.loadingTable = false
        }
      }
    }
  },
  created () {
    this.$store.dispatch('getPendingMembers')
    this.loadingTable = this.loading
  },
  methods: {
    updatePendingMember (item) {
      this.loadingItemId = item.id
      const payload = {
        id: item.id,
        status: 1
      }
      this.$store.dispatch('updatePendingMembers', payload)
    },
    loadingApprove (item) {
      if (this.loading && item.id === this.loadingItemId) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
