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
      <!-- @blur="date = parseDate(dateFormatted)" -->
      <template v-slot:activator="{ on }">
        <v-text-field
        v-model="date"
        :label="label ? label : 'Date'"
        persistent-hint
        prepend-icon="mdi-calendar"
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
  props: ['label', 'membershipFeeDate', 'dateOfBirth', 'expire_date', 'paid_date'],
  data () {
    return {
      menu: false
    }
  },
  computed: {
    date: {
      get () {
        if (this.membershipFeeDate) {
          return this.membershipFeeDate
        } else if (this.dateOfBirth) {
          return this.dateOfBirth
        } else if (this.expire_date) {
          return this.expire_date
        } else if (this.paid_date) {
          return this.paid_date
        } else {
          return null
        }
      },
      set (value) {
        this.$emit('passDate', value)
      }
    }
  },
  // watch: {
  //   date () {
  //     this.$emit('passDate', this.date)
  //   }
  // },
  mounted () {
    this.$emit('passDate', this.date)
  }
}
</script>
