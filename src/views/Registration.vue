<template>
  <v-container>
		<v-row>
			<v-col cols="12" sm="6" class="mx-auto">
				<v-card>
          <v-container>
            <v-card-title>Register Users</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="addMember" ref="form">
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
                  <v-file-input v-model="file" @change="onFileUpload" prepend-icon="mdi-camera" accept= "image/*" label="Upload image" :rules="[rules.required]"></v-file-input>
                  <v-img :src="imageUrl"></v-img>
                  <date-picker @passDate="getDate"></date-picker>
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
      this.dateFormatted !== ''
    }
  },
  data () {
    return {
      name: '',
      contact: '',
      dateFormatted: null,
      file: null,
      imageUrl: '',
      rules: {
        required: value => !!value || 'Required.'
      },
      image: null
    }
  },
  methods: {
    addMember () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const payload = {
        name: this.name,
        contact: this.contact,
        dateOfRegistration: this.dateFormatted,
        image: this.image
      }
      console.log(payload)
      this.$store.dispatch('addMember', payload)
    },
    getDate (dateFormatted) {
      console.log(dateFormatted)
      this.dateFormatted = dateFormatted
    },
    onFileUpload () {
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => { // triggers asynchronously when file has been read successfully
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(this.file)// reads the file and turns image into base64 string
      this.image = this.file
      console.log(this.image)
    }
  }
}
</script>
