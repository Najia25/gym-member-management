<template>
  <v-app>
    <NavigationDrawer :mini="mini" :sideNav="sideNav" @setSideNav="setSideNav" @setMini="setMini"></NavigationDrawer>

    <AppBar :toggleMini="toggleMini" :toggleSideNav="toggleSideNav"></AppBar>

    <v-main class="content-wrap">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer'
import AppBar from '@/components/AppBar'
export default {
  data: () => ({
    sideNav: true,
    mini: false
  }),
  components: {
    NavigationDrawer,
    AppBar
  },
  methods: {
    setSideNav (value) {
      this.sideNav = value
    },
    setMini (value) {
      this.mini = value
    },
    toggleMini () {
      this.mini = !this.mini
    },
    toggleSideNav () {
      this.sideNav = !this.sideNav
    }
  }
}
</script>

<style lang="scss">
.content-wrap {
  background: #8080801a;
}
</style>
