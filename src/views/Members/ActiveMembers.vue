<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <v-card-title>
              Approved Members List
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
              </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="approvedMembers" :search="search"  :loading="loading" loading-text="Loading... Please wait" disable-pagination hide-default-footer>
              <template v-slot:[`item.name`]="slotProps">
                <router-link class="black--text text-decoration-none" :to="{ name: 'member', params: { id: slotProps.item.id }}">{{ slotProps.item.name }}</router-link>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Id', align: 'center', sortable: false, value: 'id' },
        { text: 'Name', align: 'center', sortable: false, value: 'name' },
        { text: 'Contact', align: 'center', sortable: false, value: 'contact' },
        { text: 'Date of Birth', align: 'center', sortable: false, value: 'dob' },
        { text: 'Emergency Contact', align: 'center', sortable: false, value: 'emergency_contact' },
        { text: 'Membership Type', align: 'center', sortable: false, value: 'membership_type' },
        { text: 'Registration amount', align: 'center', sortable: false, value: 'reg_amount' },
        { text: 'Registration date', align: 'center', sortable: false, value: 'reg_date' },
        { text: 'Reference', align: 'center', sortable: false, value: 'reference' }
      ],
      loading: false,
      approvedMembers: []
    }
  },
  created () {
    this.loading = true
    this.$http.get('/activeMembers')
      .then(response => {
        this.loading = false
        this.approvedMembers = response.data.data
      })
      .catch(() => {
        this.loading = false
      })
  }
}
</script>
