<template>
  <v-dialog
  width="500"
  v-model="editDialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="mr-2" outlined small color="primary">Change Password</v-btn>
    </template>
    <v-card>
      <!-- <v-alert type="error" dismissible @input="error = false" text v-if="error">
        Passwords didn't match
      </v-alert> -->
      <v-container>
        <v-card-title>
          Change Password
        </v-card-title>
        <v-form ref="form"
          @submit.prevent = "onSaveChanges"
        >
          <v-card-text>
            <v-text-field class="mb-5"
              v-model="password"
              label="New Password"
              name="password"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field class="mb-5"
              v-model="confirmPassword"
              label="Confirm New Password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              :type="show2 ? 'text' : 'password'"
              name="confirmPassword"
              :rules="[rules.required,passwordMatch]"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="onDismissed"
              dark
              depressed
            >
              Close
            </v-btn>
            <v-btn
              color="primary"
              dark
              depressed
              type="submit"
              v-if="formIsValid"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'pass-change-dialog',
  props: ['item'],
  data () {
    return {
      editDialog: false,
      show1: true,
      show2: true,
      password: '',
      confirmPassword: '',
      passMatch: false,
      rules: {
        required: value => !!value || 'Required.'
      }
      // error: false
    }
  },
  computed: {
    passwordMatch () {
      if (this.password !== this.confirmPassword) {
        return "Passwords don't match"
      } else {
        return true
      }
    },
    formIsValid () {
      if (this.password !== '' && this.confirmPassword !== '' && this.password === this.confirmPassword) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onSaveChanges () {
      this.editDialog = false
      const payload = {
        id: this.item.id,
        password: this.password
      }
      this.$store.dispatch('updateSingleStaff', payload)
      this.$refs.form.reset()
    },
    onDismissed () {
      this.editDialog = false
      this.error = false
      this.password = ''
      this.confirmPassword = ''
      this.$refs.form.reset()
    }
  }
}
</script>
