<template>
  <v-container>
		<v-row>
			<v-col cols="12" sm="6" class="mx-auto">
				<v-card>
          <v-container>
            <v-card-title>Register Users</v-card-title>
            <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    v-model="name"
                    label="Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="contact"
                    :counter="11"
                    label="Contact"
                  ></v-text-field>
                  <v-file-input v-model="file" prepend-icon="mdi-camera" accept= "image/*" label="Upload image"></v-file-input>
                  <v-img></v-img>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFormatted"
                        label="Date"
                        hint="Date of registration"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        @blur="date = parseDate(dateFormatted)"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" large class="mx-auto mb-5">Add User</v-btn>
            </v-card-actions>
          </v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      contact: '',
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
      file: null,
      imageUrl: ''
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
