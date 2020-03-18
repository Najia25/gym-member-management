<template>
  <v-container>
    <v-row>
      <v-col>
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
              :items="members"
              :search="search"
            >
              <template v-slot:item.name="slotProps">
                <router-link :to="`/users/${slotProps.item.id}`">{{ slotProps.item.name }}</router-link>
              </template>
              <template v-slot:item.memberCount="slotProps">
                {{ members.indexOf(slotProps.item) + 1 }}
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
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Member Id',
          align: 'start',
          sortable: false,
          value: 'memberCount'
        },
        { text: 'Name', sortable: false, value: 'name' },
        { text: 'Contact', sortable: false, value: 'contact' },
        { text: 'Status', sortable: false, value: 'status' }
      ]
    }
  },
  computed: {
    ...mapState(['members'])
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
