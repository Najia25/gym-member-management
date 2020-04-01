<template>
  <v-container>
		<v-row>
			<v-col cols="12" sm="8" class="mx-auto">
				<v-card>
          <v-container>
            <v-card-title>Add New Members</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="addMember" ref="form">
                  <v-select
                    :items="items"
                    label="Membership Type"
                    v-model="membershipType"
                    outlined
                  ></v-select>
                  <v-text-field
                    v-model="name"
                    label="Name"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                  type="number"
                    v-model="contact"
                    :counter="11"
                    label="Contact"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                  type="number"
                    v-model="emgContact"
                    :counter="11"
                    label="Emergency Contact"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <date-picker @passDate="getDate" label='Date Of Birth'></date-picker>
                  <v-text-field
                    type="text"
                    v-model="occupation"
                    label="Occupation"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-textarea
                    type="text"
                    v-model="mdclCondition"
                    label="Medical Conditions (if any)"
                  ></v-textarea>
                  <v-card-actions>
                    <v-btn color="primary" large class="mx-auto mb-5" type="submit">Add Member</v-btn>
                  </v-card-actions>
                </v-form>
            </v-card-text>
          </v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import DatePicker from '../components/DatePicker.vue'
export default {
  components: {
    DatePicker
  },
  computed: {
    formIsValid () {
      return this.name !== '' &&
      this.contact !== '' &&
      this.address !== ''
    }
  },
  data () {
    return {
      items: ['Life Time'],
      dateOfBirth: null,
      name: '',
      contact: 0,
      emgContact: 0,
      occupation: '',
      mdclCondition: '',
      approvalStatus: '',
      membershipType: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    addMember () {
      // if (!this.formIsValid) {
      // return
      // }
      const payload = {
        name: this.name,
        contact: this.contact,
        emgContact: this.emgContact,
        occupation: this.occupation,
        mdclCondition: this.mdclCondition,
        approvalStatus: this.approvalStatus,
        membershipType: this.membershipType,
        dateOfBirth: this.dateOfBirth
      }
      console.log(payload)
      this.$store.dispatch('addMember', payload)
    },
    getDate (dateFormatted) {
      this.dateOfBirth = dateFormatted
    }
  }
  // computed: {
  //   isAdmin () {
  //   }
  // }
}
</script>
