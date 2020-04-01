<template>
  <v-container>
    <v-row>
      <v-col col="12" sm="6" class="mx-auto">
        <v-card class="mt-5">
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
                <v-card-actions>
                  <v-btn class="primary mt-2" type="submit">Sign In</v-btn>
                </v-card-actions>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    onSignIn () {
      console.log('chiao')
      this.$store.dispatch('signInUser', { email: this.email, password: this.password })
    }
  }
}
</script>
