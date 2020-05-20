<template>
  <v-container>
    <v-row>
      <v-col>

<!-- Pending New Payments -->
        <v-card class="mb-5">
          <v-container>
            <v-card-title>
              Pending Payments
            </v-card-title>
            <v-data-table>

            </v-data-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Member Id', align: 'start', sortable: false, value: 'memberCount' },
        { text: 'Name', sortable: false, value: 'name' },
        { text: 'Contact', sortable: false, value: 'contact' },
        { text: 'Status', sortable: false, value: 'status' }
      ]
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['loadPendingMembers', 'loadActiveMembers']),
    pendingMembersHeaders () {
      const headers = [
        { text: 'Name', sortable: false, value: 'name' },
        { text: 'Contact', sortable: false, value: 'contact' },
        { text: 'Membership Fee', sortable: false, value: 'membershipFeeAmount' },
        { text: 'Registration Date', sortable: false, value: 'membershipFeeDate' },
        { text: 'Status', sortable: false, value: 'status' },
        { text: 'Action', sortable: false, value: 'action' }
      ]
      // console.log(this.user.role)
      if (this.user.role === 'Admin') {
        return headers
      } else {
        headers.pop()
        return headers
      }
    }
  },
  methods: {
    updateStatus (item) {
      const payload = {
        status: 'Active',
        id: item.id
      }
      this.$store.dispatch('updateMemberData', payload)
    }
  }
}
</script>

<style scoped>

.v-application a {
  color: #000;
  text-decoration: none;
}
.v-application a[data-v-fae5bece]:hover {
  color: #1976d2;
}
</style>
