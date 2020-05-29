<template>
<div>
  <v-snackbar
    v-model="snackbar1"
    color="error"
    :timeout="timeout"
    top
  >
    {{ error ? error.message : '' }}
    <v-btn
      dark
      text
      @click="onDismissed"
    >
        Close
      </v-btn>
  </v-snackbar>
  <v-snackbar
    v-model="snackbar2"
    color="success"
    :timeout="timeout"
    top
  >
    {{ msg }}
    <v-btn
      dark
      text
      @click="onDismissed"
    >
        Close
      </v-btn>
  </v-snackbar>
</div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SnackBar',
  props: ['msg'],
  computed: {
    ...mapState(['error', 'success']),
    // need getter setter
    snackbar1: {
      get () {
        if (this.error !== null) {
          return true
        } else {
          return false
        }
      },
      set (value) {
        value = false
      }
    },
    snackbar2: {
      get () {
        if (this.success === true) {
          return true
        } else {
          return false
        }
      },
      set (value) {
        value = false
      }
    }
  },
  data () {
    return {
      timeout: 3500
    }
  },
  created () {
    this.$store.dispatch('clearError')
    this.$store.dispatch('clearSuccess')
  },
  methods: {
    onDismissed () {
      if (this.error) {
        this.$store.dispatch('clearError')
      } else if (this.success) {
        this.$store.dispatch('clearSuccess')
      }
    }
  }
}
</script>
