<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Pending New Members -->
        <v-card class="mb-5">
          <v-container>
            <v-card-title>
              List Of Staffs
            </v-card-title>
            <v-data-table :headers="staffListHeaders" :items="staffs" disable-pagination>
              <template v-slot:item.name="{ item }">
                <router-link :to="`/staffs/${ item.id }`">{{ item.name }}</router-link>
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
      staffListHeaders: [
        { text: 'Id', align: 'center', sortable: false, value: 'id' },
        { text: 'Name', align: 'center', sortable: false, value: 'name' },
        { text: 'Type', align: 'center', sortable: false, value: 'type' },
        { text: 'Email', align: 'center', sortable: false, value: 'email' }
      ]
    }
  },
  created () {
    this.$store.dispatch('getStaffs')
  },
  computed: {
    ...mapState(['staffs'])
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
