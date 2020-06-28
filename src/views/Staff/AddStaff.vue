<template>
  <v-container>
    <v-row>
      <v-col col="12" sm="6" class="mx-auto">
        <signup-form :msg="msg" :staffTypes="staffTypes" @onSignUp="addStaff">
          Add staff
          </signup-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignupForm from '@/components/SignupForm'
export default {
  components: {
    SignupForm
  },
  data () {
    return {
      staffTypes: ['Manager', 'Admin'],
      msg: 'Staff added'
    }
  },
  methods: {
    addStaff (payload) {
      this.$store.dispatch('addStaff', payload)
    }
  }
}
</script>
