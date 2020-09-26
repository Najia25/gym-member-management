<template>
  <v-app-bar app color="black" height="49">
    <v-btn icon class="visible-md-and-up ml-1" color="primary" @click.stop="toggleMini">
      <v-icon large>mdi-sort-variant</v-icon>
    </v-btn>
    <v-btn icon class="hidden-md-and-up" @click.stop="toggleSideNav" ><v-icon color="primary" large>mdi-sort-variant</v-icon></v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: ['toggleMini', 'toggleSideNav']
}
</script>

<style>
@media (max-width: 59.999em) {
  .v-application .visible-md-and-up {
    display: none !important;
  }
}
</style>
