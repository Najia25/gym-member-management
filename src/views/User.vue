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
                  <p>Abrar Zahin</p>
                  <p>Contact:</p>
                  <p>12345678</p>
                  <p>Status:</p>
                  <p class="status">Active</p>
                </div>
              </v-list-item-content>
              <v-list-item-avatar
                tile
                size="200"
              >
              <v-img src="http://www.desktopwallpaperhd.net/wallpapers/22/6/justin-timberlake-face-hat-228374.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <v-dialog
              width="500"
              v-model="editDialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" color="primary" outlined class="mr-5">Edit user</v-btn>
                </template>
                <v-card>
                  <v-container>
                    <v-card-title>
                      Edit User Deatils
                    </v-card-title>
                    <v-card-text>
                      <v-form>
                        <v-text-field
                          label="Name"
                        ></v-text-field>
                        <v-text-field
                          label="Contact"
                        ></v-text-field>
                        <v-text-field
                          label="Status"
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="primary"> Save</v-btn>
                      <v-btn color="primary" @click="editDialog = false">cancel</v-btn>
                    </v-card-actions>
                  </v-container>
                </v-card>
              </v-dialog>
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
              <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                  v-model="dateFormatted"
                  label="Date"
                  :hint="expirationDate"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  @blur="date = parseDate(dateFormatted)"
                  readonly
                  v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
              </v-menu>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" outlined class="mb-5 mt-5">Add payment</v-btn>
              <v-dialog
                v-model="paymentDialog"
                max-width="800px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    outlined
                    class="mb-5 mt-5 ml-5"
                    v-on="on"
                  >
                  Payment history
                  </v-btn>
                </template>
                <v-card>
                  <v-container>
                    <v-card-title>
                      Transaction History
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
                      :items="transactions"
                      :search="search"
                    >
                      <template v-slot:item.action="{ item }">
                        <v-icon
                          small
                          @click="deleteItem(item)"
                        >
                          mdi-delete
                        </v-icon>
                      </template>
                    </v-data-table>
                    <v-card-actions>
                      <v-btn @click="paymentDialog = false" color="primary">close</v-btn>
                    </v-card-actions>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-card-actions>
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
      name: '',
      contact: '',
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
      file: null,
      imageUrl: '',
      paymentDialog: false,
      editDialog: false,
      search: '',
      headers: [
        {
          text: 'Transaction Id',
          align: 'start',
          sortable: false,
          value: 'transactionId'
        },
        { text: 'Amount', sortable: false, value: 'amount' },
        { text: 'Month', sortable: false, value: 'month' },
        { text: 'Date', sortable: false, value: 'date' },
        { text: 'Actions', sortable: false, value: 'action' }
      ],
      transactions: [
        { transactionId: '1', amount: 'Abrar Zahin', month: 123456, date: 0 },
        { transactionId: '2', amount: 'Najia Afrin', month: 12345678, date: 0 },
        { transactionId: '3', amount: 'Maliha Piu', month: 12345678, date: 0 },
        { transactionId: '4', amount: 'Noushin Sharmili', month: 123456, date: 0 },
        { transactionId: '5', amount: 'Ahnaf Jaeem', month: 12345678, date: 0 }
      ]
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  computed: {
    expirationDate () {
      const date = this.dateFormatted.split('/')
      if (Number(date[1]) > 15) {
        // change status
        return 'Payment date expired'
      } else if (Number(date[1]) < 15) {
        return `Payment date expires in ${15 - Number(date[1])} days`
      } else {
        return 'Payment date expires today'
      }
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    deleteItem (item) {
      const index = this.transactions.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.transactions.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 60px auto;
  grid-column-gap: 5px;
}

.status {
  color:rgba(29, 211, 29, 0.911);
}
</style>
