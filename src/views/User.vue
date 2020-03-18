<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
        class="mx-auto mt-5"
        max-width="600"
        >
          <v-container>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline">Member details</div>
                <div class="grid-container">
                  <p>Name:</p>
                  <p>{{ member.name }}</p>
                  <p>Contact:</p>
                  <p>{{ member.contact }}</p>
                  <p>Date of registration:</p>
                  <p>{{ member.dateOfRegistration }}</p>
                  <p>Status:</p>
                  <p class="status">{{ member.status }}</p>
                </div>
              </v-list-item-content>
              <v-list-item-avatar
                tile
                size="200"
              >
              <v-img :src="member.imageUrl"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <edit-user-details-dialog></edit-user-details-dialog>
              <v-btn color="primary" outlined>Delete user</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
        <v-card
        class="mx-auto mt-5"
        max-width="600"
        >
          <v-container>
            <v-card-subtitle>
              Member payments
            </v-card-subtitle>
            <v-card-text>
              <v-form>
                <v-text-field
                :counter="10"
                label="Paid amount"
              ></v-text-field>
              <date-picker @passDate="getDate" :expirationDate = "expirationDate"></date-picker> <!-- emit event and fetch picked date -->
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" outlined class="mb-5 mt-5">Add payment</v-btn>
              <payment-history-dialog></payment-history-dialog>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentHistoryDialog from '../components/PaymentHistoryDialog.vue'
import EditUserDetailsDialog from '../components/EditUserDetailsDialog.vue'
import DatePicker from '../components/DatePicker.vue'
import { mapState } from 'vuex'

export default {
  components: {
    PaymentHistoryDialog,
    EditUserDetailsDialog,
    DatePicker
  },
  data () {
    return {
      name: '',
      contact: '',
      file: null,
      imageUrl: '',
      dateFormatted: null,
      expirationDate: ''
    }
  },
  props: ['id'],
  computed: {
    ...mapState(['members']),
    member () {
      console.log(this.$store.getters.loadMember(this.id))
      return this.$store.getters.loadMember(this.id)
    }
  },
  methods: {
    getDate (dateFormatted) {
      console.log(dateFormatted)
      this.dateFormatted = dateFormatted
      const date = this.dateFormatted.split('/')
      if (Number(date[1]) > 15) {
        // change status
        this.expirationDate = 'Payment date expired'
      } else if (Number(date[1]) < 15) {
        this.expirationDate = `Payment date expires in ${15 - Number(date[1])} days`
      } else {
        this.expirationDate = 'Payment date expires today'
      }
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 146px auto;
  grid-column-gap: 5px;
}

.status {
  color:rgba(29, 211, 29, 0.911);
}
</style>
