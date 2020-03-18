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
          <v-form>
            <v-text-field
              label="Name"
            ></v-text-field>
            <v-text-field
              label="Contact"
            ></v-text-field>
            <v-text-field
              label="Status"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary"> Save</v-btn>
          <v-btn color="primary" @click="editDialog = false">cancel</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'edit-user-details-dialog',
  data () {
    return {
      editDialog: false
    }
  }
}
</script>
