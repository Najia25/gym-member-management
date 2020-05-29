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
            </v-card-title>
            <v-data-table :headers="pendingMembersHeaders" :items="pendingMembers"  disable-pagination hide-default-footer>
              <template v-slot:item.name="{ item }">
                <router-link :to="{ name: 'member', params: { id: item.id }}">{{ item.name }}</router-link>
              </template>
              <template v-slot:item.action="{ item }" v-if="user.role === 'Admin'">
                <v-btn small color="primary" @click="updatePendingMember(item)">Approve</v-btn>
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
    ...mapState(['user', 'pendingMembers', 'error', 'success']),
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
  data () {
    return {
      msg: 'Member approved',
      timeOut: 3000
    }
  },
  created () {
    this.$store.dispatch('getPendingMembers')
    // 26:37 post
  },
  methods: {
    updatePendingMember (item) {
      const payload = {
        id: item.id,
        status: 1
      }
      this.$store.dispatch('updatePendingMembers', payload)
    }
  }
}
</script>
