<template>
  <v-app>
    <v-main class="signup-wrapper">
      <!-- <div class="signup-wrapper"> -->
        <v-container>
          <v-row>
            <v-col col="12" sm="6" class="mx-auto">
              <signup-form isAdminSignup="true" :staffTypes="staffTypes" @onSignUp="onSignUp">
              </signup-form>
            </v-col>
          </v-row>
        </v-container>
      <!-- </div> -->
    </v-main>
  </v-app>
</template>

<script>
import SignupForm from '@/components/SignupForm'
// import { mapState } from 'vuex'
export default {
  components: {
    SignupForm
  },
  data () {
    return {
      staffTypes: ['Admin']
    }
  },
  methods: {
    onSignUp (payload) {
      // if session implemented later on..in order to prevent accessing this page by pasting url on browser add restriction on sign up, e.g - only admin who is logged in can submit this form
      if (this.$store.state.adminExist === 0) {
        this.$store.dispatch('addStaff', payload)
      } else {
        alert('Admin Exists!')
      }
      this.$router.push('/signin')
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-wrapper {
  text-align: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)), url('assets/background.jpg') center top;
  background-size: cover;
  height: 100vh;
  align-items: center;
}
</style>
