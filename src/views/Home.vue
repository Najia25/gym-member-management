<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mb-5">
          <v-container>
            <v-card-title>
              Home
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="home" :search="search" :loading="loading ? true : false" loading-text="Loading... Please wait" hide-default-footer disable-pagination>
                <template v-slot:item="{ item }">
                  <tr class="text-center" v-bind:class="{'green accent-1': isGreen(item.remaining_days), 'lime accent-1': isYellow(item.remaining_days), 'red accent-1': isRed(item.remaining_days) }">
                    <td>{{ item.id }}</td>
                    <td>
                      <router-link class="text-black" :to="{ name: 'member', params: { id: item.id }}">{{ item.name }}</router-link>
                    </td>
                    <td>{{ item.contact }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.paid_date }}</td>
                    <td>{{ item.expire_date }}</td>
                    <td>{{ item.remaining_days }}</td>
                  </tr>
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
      isActive: false,
      headers: [
        { text: 'Id', align: 'center', sortable: false, value: 'id' },
        { text: 'Name', align: 'center', sortable: false, value: 'name' },
        { text: 'Contact', align: 'center', sortable: false, value: 'contact' },
        { text: 'Amount (Paid)', align: 'center', sortable: false, value: 'amount' },
        { text: 'Payment Date', align: 'center', sortable: false, value: 'paid_date' },
        { text: 'Expire Date', align: 'center', sortable: false, value: 'expire_date' },
        { text: 'Remaining Days', align: 'center', sortable: false, value: 'remaining_days' }
      ]
    }
  },
  computed: {
    ...mapState(['home', 'loading'])
  },
  created () {
    this.$store.dispatch('getHomeItems')
  },
  methods: {
    isGreen (remainingDays) {
      if (remainingDays > 7) {
        return true
      } else {
        return false
      }
    },
    isYellow (remainingDays) {
      if (remainingDays <= 7 && remainingDays > 0) {
        return true
      } else {
        return false
      }
    },
    isRed (remainingDays) {
      if (remainingDays < 1) {
        return true
      } else {
        return false
      }
    }
    // getColor (remainingDays) {
    //   if (remainingDays <= 7 && remainingDays > 0) return 'yellow'
    //   else if (remainingDays < 1) return 'red'
    //   else return 'green'
    // }
  }
}
</script>

<style>
.v-application a {
  text-decoration: none;
}
.text-black {
  color: #000 !important;
}
.text-black:hover {
  color:rgb(38, 134, 224) !important;
}
</style>
