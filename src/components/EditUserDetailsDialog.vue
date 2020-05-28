<template>
  <v-dialog
  width="500"
  v-model="editDialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" outlined class="mr-5">Edit user</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-card-title>
          Edit User Deatils
        </v-card-title>
        <v-card-text>
          <v-select
            :items="items"
            label="Membership Type"
            v-model="membershipType"
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
          <date-picker @passDate="getDate" label='Date Of Birth' :dateOfBirth="dateOfBirth"></date-picker>
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
          <v-text-field
            :counter="4"
            label="Paid amount"
            type="number"
            v-model="membershipFeeAmount"
          ></v-text-field>
          <date-picker @passDate="getMembershipFeeDate" :membershipFeeDate="membershipFeeDate" label='Payment Date'></date-picker>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="editDialog = false"
            dark
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            dark
            @click="onSaveChanges"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue'
export default {
  name: 'edit-user-details-dialog',
  components: {
    DatePicker
  },
  props: ['singleMember'],
  data () {
    return {
      editDialog: false,
      items: ['Life Time', 'Permanent'],
      dateOfBirth: this.singleMember.dob,
      name: this.singleMember.name,
      contact: this.singleMember.contact,
      emgContact: this.singleMember.emergency_contact,
      occupation: this.singleMember.occupation,
      mdclCondition: this.singleMember.medical_condition,
      membershipType: this.singleMember.membership_type,
      membershipFeeAmount: this.singleMember.reg_amount,
      membershipFeeDate: this.singleMember.reg_date,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    getDate (date) {
      this.dateOfBirth = date
    },
    getMembershipFeeDate (date) {
      this.membershipFeeDate = date
    },
    onSaveChanges () {
      if (this.name.trim() === '' && this.contact.trim() === '' && this.emgContact.trim() === '' && this.occupation.trim() === '' && this.mdclCondition.trim() === '' && this.membershipFeeAmount.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateSingleMemberData', {
        id: this.singleMember.id,
        name: this.name,
        contact: this.contact,
        emergency_contact: this.emgContact,
        dob: this.dateOfBirth,
        occupation: this.occupation,
        medical_condition: this.mdclCondition,
        membership_type: this.membershipType,
        reg_amount: this.membershipFeeAmount,
        reg_date: this.membershipFeeDate
      })
    }
  }
}
</script>
