<template>
 <v-container>
    <v-row>
      <v-col col="12" sm="6" class="mx-auto">
        <v-card class="mt-5">
          <v-card-text>
            <v-container>
              <v-form ref="form">
                <v-text-field
                  label="Username"
                  v-model="username"
                  name="username"
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
              </v-form>
              <v-card-action>
                <v-btn class="primary mt-2" type="submit">Sign In</v-btn>
              </v-card-action>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      username: '',
      password: '',
      rules: {
        // required: value => !!value || 'Required.',
        required: function (value) {
          if (!value) {
            return 'Required'
          }
        }
      }
    }
  }
}
</script>
