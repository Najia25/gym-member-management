<template>
  <v-card class="mt-5">
    <v-card-title>
      <slot>Sign Up</slot>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="form"
        @submit.prevent = "onSignUp"
        >
          <v-select
            v-if="!isAdminSignup"
            label="Staff type"
            :items="staffTypes"
            v-model="staffType"
            outlined
          ></v-select>
          <v-text-field class="mb-5"
            v-model="email"
            label="Email"
            name="email"
            type="email"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field class="mb-5"
            v-model="password"
            label="Password"
            name="password"
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field class="mb-5"
            v-model="confirmPassword"
            label="Confirm Password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show2 = !show2"
            :type="show2 ? 'text' : 'password'"
            name="confirmPassword"
            :rules="[rules.required,passwordMatch]"
          ></v-text-field>
          <v-card-actions>
            <v-btn class="primary mt-2" type="submit">Add</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'signup-form',
  props: ['isAdminSignup', 'staffTypes'],
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
      staffType: ''
    }
  },
  computed: {
    passwordMatch () {
      return this.password !== this.confirmPassword ? "Passwords don't match" : true
    }
    // error () {
    //   return this.$store.getters.error
    // },
    // loading () {
    //   return this.$store.getters.loading
    // }
  },
  methods: {
    onSignUp () {
      let payload
      if (this.staffType) {
        payload = {
          email: this.email,
          password: this.password,
          role: this.staffType
        }
      } else {
        payload = {
          email: this.email,
          password: this.password
        }
      }
      this.$emit('onSignUp', payload)
      // this.$store.dispatch('signUpUser', { email: this.email, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
