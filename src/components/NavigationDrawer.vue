<template>
<v-navigation-drawer v-model="sideNavProp"
  app
  dark
  mobile-breakpoint="960"
  width="225"
  :mini-variant.sync="miniProp"
  color="rgb(25, 24, 24)"
  >
    <v-list class="pa-0">
      <v-list-item class="primary justify-center">
        <v-img src="@/assets/logo.png" aspect-ratio="1.7" contain max-height="41" max-width="110" min-width="56"></v-img>
      </v-list-item>
    </v-list>

    <v-list three-line v-if="!miniProp" color="#0000004f">
      <v-list-item class="text-center">
        <v-list-item-content>
          <v-icon color="primary" size="24">mdi-account-circle</v-icon>
          <v-list-item-title class="button text-uppercase font-weight-medium grey--text text--lighten-1 mt-2">{{ user.role }}</v-list-item-title>
          <v-list-item-subtitle class="mr-3 grey--text text--lighten-1 body-2"><v-icon size="24" color="green">mdi-circle-medium</v-icon>online</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list class="pa-0">
      <v-list-item  to="/">
        <v-list-item-icon>
          <v-icon> mdi-home-outline </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Home </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        v-for="item in menuItems"
        :key="item.title"
        no-action
        :prepend-icon="item.icon"
        active-class="active-control"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.link"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list-group>

      <v-list-item @click="onLogout">
        <v-list-item-icon>
          <v-icon> mdi-logout-variant </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['mini', 'sideNav'],
  computed: {
    ...mapState(['user', 'loading']),
    sideNavProp: {
      get () {
        return this.sideNav
      },
      set (value) {
        this.$emit('setSideNav', value)
      }
    },
    miniProp: {
      get () {
        return this.mini
      },
      set (value) {
        this.$emit('setMini', value)
      }
    },
    menuItems () {
      let menuItems
      if (this.user.role === 'Admin') {
        menuItems = [
          {
            icon: 'mdi-account-multiple-outline',
            title: 'Members',
            items: [
              // { title: 'All Members', link: '/members/all-members' },
              { title: 'Approved Members', link: '/members/active-members' },
              { title: 'Pending Members', link: '/members/pending-members' },
              { title: 'Add Members', link: '/members/add-member' }
            ]
          },
          {
            icon: 'mdi-currency-usd',
            title: 'Payments',
            items: [
              { title: 'Pending Payments', link: '/payments/pending-payments' }
            ]
          },
          {
            icon: 'mdi-account-outline',
            title: 'Staff',
            items: [
              { title: 'Staff List', link: '/staff/staff-list' },
              { title: 'Add Staff', link: '/staff/add-staff' }
            ]
          },
          {
            icon: 'mdi-file-chart-outline',
            title: 'Reports',
            items: [
              { title: 'Reference Report', link: '/reports/reference-report' }
            ]
          }
        ]
      } else {
        menuItems = [
          {
            icon: 'mdi-account-multiple-outline',
            title: 'Members',
            items: [
              // { title: 'All Members', link: '/members/all-members' },
              { title: 'Approved Members', link: '/members/active-members' },
              { title: 'Pending Members', link: '/members/pending-members' },
              { title: 'Add Members', link: '/members/add-member' }
            ]
          },
          {
            icon: 'mdi-currency-usd',
            title: 'Payments',
            items: [
              { title: 'Pending Payments', link: '/payments/pending-payments' }
            ]
          }
        ]
      }
      return menuItems
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logOut')
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/variables.scss";
.active-control {
  background: black;
}

.v-list-item {
  &__icon {
    margin-right: 10px !important;
  }
  &__title {
    font-size: .875rem;
  }
  &--active::before, &--active:hover::before {
    opacity: 0 !important;
  }
}

.v-icon {
  font-size: $icon-size;
}

.v-application--is-ltr .v-list-group--no-action > .v-list-group__items > .v-list-item {
  padding-left: 49px !important;
}

.mdi-chevron-down::before {
  display: none;
}
</style>
