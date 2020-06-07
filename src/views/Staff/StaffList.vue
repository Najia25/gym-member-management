<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Pending New Members -->
        <v-card class="mb-5">
          <v-container>
            <v-card-title>
              List of staffs
            </v-card-title>
            <v-data-table :headers="staffListHeaders" :items="staffs"  hide-default-footer disable-pagination>
              <template v-slot:item.action="{ item }">
                <confirm-delete-dialog :item="item"></confirm-delete-dialog>
                <pass-change-dialog :item="item"></pass-change-dialog>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import PassChangeDialog from '@/components/PassChangeDialog.vue'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue'

export default {
  components: {
    PassChangeDialog,
    ConfirmDeleteDialog
  },
  data () {
    return {
      search: '',
      staffListHeaders: [
        { text: 'Id', align: 'center', sortable: false, value: 'id' },
        { text: 'Name', align: 'center', sortable: false, value: 'name' },
        { text: 'Type', align: 'center', sortable: false, value: 'type' },
        { text: 'Email', align: 'center', sortable: false, value: 'email' },
        { text: 'Action', sortable: false, value: 'action' }
      ]
    }
  },
  created () {
    this.$store.dispatch('getStaffs')
  },
  computed: {
    ...mapState(['staffs'])
  }
}
</script>

<style scoped>
.v-application a {
  color: #000;
  text-decoration: none;
}
.v-application a[data-v-fae5bece]:hover {
  color: #1976d2;
}
</style>
