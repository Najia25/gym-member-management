<template>
<div>
  <v-snackbar
    v-model="snackbar1"
    color="error"
    :timeout="timeOut"
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
    :timeout="timeOut"
    top
  >
    Member added successfully.
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
  computed: {
    ...mapState(['error', 'success']),
    snackbar1 () {
      if (this.error) {
        return true
      } else {
        return false
      }
    },
    snackbar2 () {
      if (this.success) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      timeOut: 0
    }
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
