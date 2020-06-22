<template>
  <v-app>
    <v-content>
      <v-img src="@/assets/background.jpg" lazy-src="@/assets/background-min.jpg" :aspect-ratio="16/9" class="maxHeight">
        <v-row align="center" class="signup-wrapper fill-height">
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
                        autocomplete="new-password"
                      ></v-text-field>
                        <v-btn
                          :loading="loading ? true : false"
                          :disabled="loading ? true : false"
                          class="primary mt-2"
                          type="submit"
                        >
                          Sign In
                          <template v-slot:loader>
                            <span class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span>
                          </template>
                        </v-btn>
                    </v-form>
                  </v-container>
                </v-card-text>
              </v-card>
          </v-col>
        </v-row>
      </v-img>
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
    ...mapState(['user', 'error', 'loading'])
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
      // console.log('chiao')
      this.$store.dispatch('signInUser', { email: this.email, password: this.password })
    },
    onDismissed () {
      if (this.error) {
        this.$store.commit('clearError')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-wrapper {
  text-align: center;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
}
.maxHeight {
  height: 100vh;
}

</style>
