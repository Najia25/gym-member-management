<template>
  <v-container>
    <v-row>
      <v-col>

<!-- Pending New Members -->
        <v-card class="mb-5">
          <v-container>
            <v-card-title>
              Pending New Members
            </v-card-title>
            <v-data-table
              :headers="pendingMembersHeaders"
              :items="loadPendingMembers"
              >
                <template v-slot:item.name="{ item }">
                  <router-link :to="`/users/${ item.id }`">{{ item.name }}</router-link>
                </template>
                <template v-slot:item.action="{ item }" v-if="user.role === 'Admin'">
                  <v-btn small color="primary" @click="updateStatus(item)">Approve</v-btn>
                </template>
            </v-data-table>
          </v-container>
        </v-card>

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

<!-- All Members -->
        <v-card>
          <v-container>
            <v-card-title>
              Members List
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="loadActiveMembers"
              :search="search"
            >
              <template v-slot:item.name="slotProps">
                <router-link :to="`/users/${slotProps.item.id}`">{{ slotProps.item.name }}</router-link>
              </template>
              <template v-slot:item.memberCount="slotProps">
                {{ loadActiveMembers.indexOf(slotProps.item) + 1 }}
              </template>
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
      let headers
      if (this.user.role === 'Admin') {
        headers = [
          { text: 'Name', sortable: false, value: 'name' },
          { text: 'Contact', sortable: false, value: 'contact' },
          { text: 'Membership Fee', sortable: false, value: 'membershipFeeAmount' },
          { text: 'Registration Date', sortable: false, value: 'membershipFeeDate' },
          { text: 'Status', sortable: false, value: 'status' },
          { text: 'Action', sortable: false, value: 'action' }
        ]
      } else {
        headers = [
          { text: 'Name', sortable: false, value: 'name' },
          { text: 'Contact', sortable: false, value: 'contact' },
          { text: 'Membership Fee', sortable: false, value: 'membershipFeeAmount' },
          { text: 'Registration Date', sortable: false, value: 'membershipFeeDate' },
          { text: 'Status', sortable: false, value: 'status' }
        ]
      }
      return headers
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
