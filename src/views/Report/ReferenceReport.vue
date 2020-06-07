<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto">
        <v-card>
          <v-container>
            <v-card-title>Report</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <date-picker @passDate="getFromDate" :fromDate="fromDate" label='From'></date-picker>
                </v-col>
                <v-col cols="12" sm="6">
                  <date-picker @passDate="getToDate" :toDate="toDate" label='To'></date-picker>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" large class="mx-auto mb-5" @click="showReport">Show Report</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>

        <v-card class="mt-5" v-if="show">
          <v-container>
            <v-card-title>
              Reference Report
            </v-card-title>
              <v-data-table :headers="referenceReportHeader" :items="referenceReport"  disable-pagination hide-default-footer>
              </v-data-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DatePicker from '@/components/DatePicker.vue'
export default {
  components: {
    DatePicker
  },
  data () {
    return {
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
      referenceReportHeader: [
        { text: 'Staff Name', align: 'center', sortable: false, value: 'name' },
        { text: 'Added Member', align: 'center', sortable: false, value: 'addedMember' }
      ],
      show: false
    }
  },
  computed: {
    ...mapState(['referenceReport'])
  },
  created () {
    this.show = false
  },
  methods: {
    getFromDate (date) {
      this.fromDate = date
    },
    getToDate (date) {
      this.toDate = date
    },
    showReport () {
      this.show = true
      const payload = {
        fromDate: this.fromDate,
        toDate: this.toDate
      }
      this.$store.dispatch('getReferenceReport', payload)
    }
  }
}
</script>
