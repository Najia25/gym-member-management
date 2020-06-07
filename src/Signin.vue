<template>
  <v-app>
    <v-content class="signup-wrapper">
      <v-container>
        <v-row>
          <v-col col="12" sm="6" class="mx-auto">
              <v-card class="mt-5" color= "rgba(0, 0, 0, 0.4)" dark>
              <v-alert type="error" dismissible @input="onDismissed" v-if="error">
                Incorrect credentials
              </v-alert>
                <v-card-text>
                  <v-container>
                    <v-form ref="form"
                    @submit.prevent = "onSignIn"
                    >
                    <v-text-field class="mb-5"
                      v-model="email"
                      label="Email"
                      name="email"
                      type="email"
                      :rules="[rules.required]"
                    ></v-text-field>
                      <v-text-field
                        label="Password"
                        v-model="password"
                        name="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required]"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                      ></v-text-field>
                        <v-btn class="mt-2 primary" type="submit" >Sign In</v-btn>
                    </v-form>
                  </v-container>
                </v-card-text>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      show: false,
      email: '',
      password: '',
      rules: {
        // required: value => !!value || 'Required.',
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    ...mapState(['user', 'error', 'success'])
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn () {
      console.log('chiao')
      this.$store.dispatch('signInUser', { email: this.email, password: this.password })
    },
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

<style lang="scss" scoped>
.signup-wrapper {
  text-align: center;
  align-items: center;
  background:
  linear-gradient(
      to right,
      rgba(0, 0, 0,0),
      rgba(0, 0, 0, 0.5)
    ),
    url('assets/signup-background.jpeg') center top;
  background-size: cover;
  height: 100vh;
  align-items: center;
}
</style>
