<template>
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
</template>

<script>
export default {
  name: 'payment-history-dialog',
  data () {
    return {
      paymentDialog: false,
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
  methods: {
    deleteItem (item) {
      const index = this.transactions.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.transactions.splice(index, 1)
    }
  }
}
</script>
