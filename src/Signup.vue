<template>
  <div class="signup-wrapper">
    <v-container>
      <v-row>
        <v-col col="12" sm="6" class="mx-auto">
          <signup-form isAdminSignup="true" :staffTypes="staffTypes" @onSignUp="onSignUp">
          </signup-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm'
import { mapState } from 'vuex'
export default {
  components: {
    SignupForm
  },
  data () {
    return {
      staffTypes: ['Admin']
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
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

<style lang="scss" scoped>
.signup-wrapper {
  padding-top: 40vh;
  overflow: hidden;
  text-align: center;
  align-items: center;
  background:
    linear-gradient(
      to right,
      rgba(0, 0, 0,0.1),
      rgba(0, 0, 0, 0.7)
    ),
    url('assets/background.jpg') center top;
  background-size: cover;
  height: 100vh;
  align-items: center;
}
</style>
