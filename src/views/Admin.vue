<template>
  <v-container>
    <v-row>
      <v-col col="12" sm="6" class="mx-auto">
        <signup-form :staffTypes="staffTypes" @onSignUp="onSignUp">Add staff</signup-form>
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
  data () {
    return {
      show1: true,
      show2: true,
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        required: value => !!value || 'Required.' // UNDERSTAND
        // const var2 = var1 ? var1 : "something";
        // ...use || operator
        // const var2 = var1 || "something"; here var1 is not a boolean value
      },
      staffTypes: ['Manager']
    }
  },
  computed: {
    passwordMatch () {
      return this.password !== this.confirmPassword ? "Passwords don't match" : false
    }
    // roles () {
    // }
    // user () {
    //   return this.$store.getters.user
    // },
    // error () {
    //   return this.$store.getters.error
    // },
    // loading () {
    //   return this.$store.getters.loading
    // }
  },
  // watch: {
  //   user (value) {
  //     if (value !== null && value !== undefined) {
  //       this.$router.push('/')
  //     }
  //   }
  // },
  methods: {
    onSignUp (payload) {
      payload = {
        ...payload,
        role: payload.role
      }
      console.log(payload)
      this.$store.dispatch('signUpUser', payload)
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
