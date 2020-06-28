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
            <v-data-table :search="search" :headers="pendingMembersHeaders" :items="pendingMembers"  :loading="loadingTable" loading-text="Loading... Please wait" disable-pagination hide-default-footer>
              <template v-slot:item.name="{ item }">
                <router-link class="black--text text-decoration-none" :to="{ name: 'member', params: { id: item.id }}">{{ item.name }}</router-link>
              </template>
              <template v-slot:item.action="{ item }" v-if="user.role === 'Admin'">
                <!-- <v-btn small color="primary" @click="updatePendingMember(item)">Approve</v-btn> -->
                <v-btn
                  :loading="loadingApprove(item)"
                  :disabled="loadingApprove(item)"
                  color="primary"
                  small
                  @click="updatePendingMember(item)"
                >
                  Approve
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                  </template>
                </v-btn>
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
    SnackBar
  },
  computed: {
    ...mapState(['user', 'pendingMembers', 'error', 'success', 'loading']),
    pendingMembersHeaders () {
      const headers = [
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
      if (this.user.role === 'Admin') {
        return headers
      } else {
        headers.pop()
        return headers
      }
    },
    loadingTable () {
      if (this.loading && !this.loading.id) {
        if (this.loading.type.match(/pendingMembers/g)) {
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
      msg: 'Member approved',
      timeOut: 3000,
      search: ''
      // id: 0
    }
  },
  created () {
    this.$store.dispatch('getPendingMembers')
    // this.loadingTable = this.loading
  },
  methods: {
    updatePendingMember (item) {
      const payload = {
        id: item.id,
        status: 1
      }
      this.$store.dispatch('updatePendingMembers', payload)
      // this.loadingApprove = this.loading
    },
    loadingApprove (item) {
      if (this.loading && this.loading.id) {
        if (this.loading.type.match(/approveMembers/g) && this.loading.id === item.id) {
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
