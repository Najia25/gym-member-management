<template>
  <v-container>
		<v-row>
			<v-col cols="12" sm="8" class="mx-auto">
				<v-card class="mb-5">
          <v-container>
            <v-card-title>Add New Member</v-card-title>
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
                  <date-picker @passDate="getDate" :dateOfBirth="dateOfBirth" label='Date Of Birth'></date-picker>
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
                  <v-card outlined class="mb-5">
                    <v-container>
                      <v-card-title>Membership fee payment</v-card-title>
                      <v-card-text>
                          <v-text-field
                            :counter="4"
                            label="Paid amount"
                            type="number"
                            v-model="membershipFeeAmount"
                          ></v-text-field>
                          <!-- <v-text-field
                            :counter="4"
                            label="Due amount"
                            type="number"
                          ></v-text-field> -->
                          <date-picker @passDate="getMembershipFeeDate" :membershipFeeDate="membershipFeeDate" label='Payment Date'></date-picker> <!-- emit event and fetch picked date -->
                      </v-card-text>
                    </v-container>
                  </v-card>
                  <v-card-actions>
                    <v-btn color="primary" large class="mx-auto mb-5" type="submit">Add Member</v-btn>
                  </v-card-actions>
                </v-form>
            </v-card-text>
          </v-container>
          <!-- <v-alert type="error" dismissible @input="onDismissed" text v-if="error">
            {{ error.message }}
          </v-alert>
          <v-alert type="success" dismissible text v-if="success">
            bla bla shit
          </v-alert> -->
        <SnackBar :msg="msg"></SnackBar>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue'
import SnackBar from '@/components/SnackBar.vue'
import { mapState } from 'vuex'
export default {
  components: {
    DatePicker,
    SnackBar
  },
  computed: {
    ...mapState(['user', 'error', 'success'])

    // formIsValid () {
    //   return this.name !== '' &&
    //   this.contact !== '' &&
    //   this.address !== ''
    // }
  },
  data () {
    return {
      items: ['Life Time'],
      dateOfBirth: null,
      membershipFeeDate: new Date().toISOString().substr(0, 10),
      name: '',
      contact: 0,
      emgContact: 0,
      occupation: '',
      mdclCondition: 'None',
      membershipType: '',
      membershipFeeAmount: 0,
      status: 0,
      rules: {
        required: value => !!value || 'Required.'
      },
      timeOut: 0,
      msg: 'Member added'
    }
  },
  methods: {
    addMember () {
      const payload = {
        name: this.name,
        contact: this.contact,
        emgContact: this.emgContact,
        occupation: this.occupation,
        mdclCondition: this.mdclCondition,
        membershipType: this.membershipType,
        dateOfBirth: this.dateOfBirth,
        membershipFeeAmount: this.membershipFeeAmount,
        membershipFeeDate: this.membershipFeeDate,
        staff_id: this.user.id,
        status: this.status
      }
      console.log(payload)
      this.$store.dispatch('addMember', payload)

      this.$refs.form.reset()
    },
    getDate (date) {
      this.dateOfBirth = date
    },
    getMembershipFeeDate (membershipFeeDate) {
      this.membershipFeeDate = membershipFeeDate
    }
  }
}
</script>
