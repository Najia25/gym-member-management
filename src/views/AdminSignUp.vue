<template>
  <v-container>
    <v-row>
      <v-col col="12" sm="6" class="mx-auto">
        <signup-form isAdminSignup="true" @onSignUp="onSignUp"></signup-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignupForm from '../components/SignupForm'
export default {
  components: {
    SignupForm
  },
  methods: {
    onSignUp (payload) {
      payload = {
        ...payload,
        role: 'Admin'
      }
      console.log(payload)
      this.$store.dispatch('signUpUser', payload)
    }
  }
}
</script>
