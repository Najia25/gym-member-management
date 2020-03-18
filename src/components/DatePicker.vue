<template>
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
        :hint="expirationDate ? expirationDate : ''"
        persistent-hint
        prepend-icon="mdi-calendar"
        @blur="date = parseDate(dateFormatted)"
        readonly
        v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
    </v-menu>
</template>

<script>

export default {
  name: 'date-picker',
  props: ['expirationDate'],
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
      this.$emit('passDate', this.dateFormatted)
    }
  },
  mounted () {
    this.$emit('passDate', this.dateFormatted)
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
    }
  }
}
</script>
