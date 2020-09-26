<template>
  <v-container>
    <v-row>
      <v-col col="12" sm="6" class="mx-auto">
          <v-card class="mt-5">
            <SnackBar :msg="msg"></SnackBar>
            <v-card-title>
              Add Staff
            </v-card-title>
            <v-card-text>
            <v-container>
              <v-form ref="form"
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
                  autocomplete="false"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field class="mb-5"
                  v-model="password"
                  label="Password"
                  name="password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  autocomplete="new-password"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field class="mb-5"
                  v-model="confirmPassword"
                  label="Confirm Password"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                  :type="show2 ? 'text' : 'password'"
                  name="confirmPassword"
                  autocomplete="new-password"
                  :rules="[rules.required,passwordMatch]"
                ></v-text-field>
                <v-card-actions>
                  <v-btn class="primary mt-2" @click="addStaff" :disabled="!formIsValid">Add</v-btn>
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
import SnackBar from '@/components/SnackBar.vue'
export default {
  components: {
    SnackBar
  },
  data () {
    return {
      staffTypes: ['Manager', 'Admin'],
      msg: 'Staff added',
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
    addStaff () {
      const payload = {
        name: this.name,
        type: this.staffType,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('addStaff', payload)
      this.$refs.form.reset()
    }
  }
}
</script>
