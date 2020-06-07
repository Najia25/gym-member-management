<template>
  <v-dialog
  width="344"
  v-model="editDialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="mr-2" v-on="on" outlined small color="primary">Delete</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-card-title>
          Confirm Delete
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this staff?
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            dark
            @click="onSaveChanges"
            depressed
            small
          >
            Yes
          </v-btn>
          <v-btn
            color="primary"
            @click="editDialog = false"
            dark
            depressed
            small
          >
            No
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'confirm-delete-dialog',
  props: ['item'],
  data () {
    return {
      editDialog: false
    }
  },
  methods: {
    onSaveChanges () {
      this.editDialog = false
      const payload = {
        id: this.item.id
      }
      this.$store.dispatch('deleteStaff', payload)
    }
  }
}
</script>
