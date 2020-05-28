<template>
  <v-card class="mt-5">
    <v-alert type="error" dismissible @input="onDismissed" text v-if="error">
      {{ error.message }}
    </v-alert>
    <v-alert type="success" dismissible @input="onDismissed" text v-if="success">
      {{ msg }}
    </v-alert>
    <v-card-title>
      <slot>Sign Up</slot>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="form"
        @submit.prevent = "onSignUp"
        >
          <v-select
            label="Staff type"
            :items="staffTypes"
            v-model="staffType"
            outlined
          ></v-select>
          <v-text-field class="mb-5"
            v-model="name"
            label="Name"
            name="name"
            :rules="[rules.required]"
          ></v-text-field>
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
            <v-btn class="primary mt-2" type="submit" v-if="formIsValid">Add</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'signup-form',
  props: ['staffTypes', 'msg', 'isAdminSignup'],
  data () {
    return {
      show1: true,
      show2: true,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        required: value => !!value || 'Required.'
      },
      staffType: ''
    }
  },
  computed: {
    ...mapState(['error', 'success']),
    formIsValid () {
      return this.name !== '' &&
      this.email !== '' &&
      this.password !== '' &&
      this.confirmPassword !== '' &&
      this.password === this.confirmPassword
    },
    passwordMatch () {
      return this.password !== this.confirmPassword ? "Passwords don't match" : true
    }
  },
  methods: {
    onSignUp () {
      let payload
      if (this.staffType) {
        payload = {
          name: this.name,
          type: this.staffType,
          email: this.email,
          password: this.password
        }
      } else {
        payload = {
          email: this.email,
          password: this.password
        }
      }
      this.$emit('onSignUp', payload)
      this.$refs.form.reset()
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
