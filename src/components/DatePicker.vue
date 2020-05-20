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
        :hint="expirationDate ? expirationDate : ''"
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
  props: ['expirationDate', 'label'],
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false
    }
  },
  // try making it computed and pass down s prop assuming props are reactive.
  watch: {
    date () {
      this.$emit('passDate', this.date)
    }
  },
  mounted () {
    this.$emit('passDate', this.date)
  }
}
</script>
