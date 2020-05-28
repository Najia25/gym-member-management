<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav"
    app
    dark
    mobile-break-point="960"
    width="230"
    :mini-variant.sync="mini"
    >
    <v-list>
      <v-list-item class="primary justify-center" two-line >
        <img src="@/assets/logo.png" :class="{ 'shrink-width': mini }"/>
      </v-list-item>
    </v-list>

    <v-list three-line v-if="!mini && this.userIsAuthenticated">
      <v-list-item class="text-center online">
        <v-list-item-content>
          <v-icon>mdi-account-circle</v-icon>
          <v-list-item-title class="role">{{ user.role }}</v-list-item-title>
          <v-list-item-subtitle class="mt-2 status">online</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div class="wrapper">
      <div class="progress text-center mt-5">
        <v-progress-circular
          indeterminate
          color="amber"
          v-if="loading"
          size="20"
          width="4"
        ></v-progress-circular>
      </div>
        <v-list v-if="!loading">
            <v-list-item  to="/" v-if="this.userIsAuthenticated">
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
          active-class="active-control"
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
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
            <v-list-item @click="onLogout" v-if="this.userIsAuthenticated">
              <v-list-item-icon>
                <v-icon> mdi-logout-variant </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Logout </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon class="visible-md-and-up ml-1" @click.stop="mini = !mini"></v-app-bar-nav-icon >
      <v-app-bar-nav-icon @click ="sideNav = !sideNav" class="hidden-md-and-up"></v-app-bar-nav-icon >
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    sideNav: true,
    mini: false
  }),
  computed: {
    ...mapState(['user', 'loading']),
    menuItems () {
      let menuItems
      if (this.userIsAuthenticated) {
        if (this.user.role === 'Admin') {
          menuItems = [
            {
              icon: 'mdi-account-multiple-outline',
              title: 'Members',
              items: [
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
            }
          ]
        } else {
          menuItems = [
            {
              icon: 'mdi-account-multiple-outline',
              title: 'Members',
              items: [
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
      } else {
        if (this.adminExists) {
          menuItems = [
            { icon: 'mdi-account', title: 'Signin', link: '/signin' }
          ]
        } else {
          menuItems = [
            { icon: 'mdi-account', title: 'Signin', link: '/signin' },
            { icon: 'mdi-account', title: 'Signup', link: '/staff/add-staff' }
          ]
        }
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.user !== null && this.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logOut')
    }
  }
}
</script>

<style>
.active-control {
  background: black;
}
.shrink-width {
  width:56px;
  height: 34px;
}
.theme--dark.v-navigation-drawer {
  background-color: #191818;
}

.v-list.v-sheet.v-sheet--tile.theme--dark {
  padding: 0px;
}
.v-list-item__title {
  font-size: .875rem;
}

.v-list-item .v-list-item__icon {
  margin-right: 10px !important;
}
.v-icon.v-icon {
  font-size: 20px !important;
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #191818 !important;
  color: #ffd600;
}

.v-content__wrap {
  background: #8080801a;
}
.logo {
  position: fixed;
  top: 0px;
  left: 0px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  width: 230px;
  display: block;
  z-index: 10;
  text-align: center;
  height: 50px;
  line-height: 80px;
}
.role {
  font-size: .89rem;
  color: #bab5b5;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 8px;
  margin-bottom: .5px !important;
}
.online {
  background: #0000004f;
  line-height: 22px;
}
i.v-icon.notranslate.mdi.mdi-account-circle.theme--dark {
  color: #ffd600;
  font-size: 1.5rem !important;
}
.status {
  position: relative;
}
.status::after {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  top: 2px;
  left: 55px;
  background: #0cae0c;
  border-radius: 100%;
  border: 1px solid #0cae0c;
}

i.v-icon.notranslate.mdi.mdi-menu.theme--light {
  font-size: 34px !important;
}
.theme--light.v-btn.v-btn--icon {
  color: #ffd600 !important;
}

.theme--dark.v-list-item--active:hover::before, .theme--dark.v-list-item--active::before {
  opacity: 0 !important;
}

.v-application--is-ltr .v-list-group--no-action > .v-list-group__items > .v-list-item {
    padding-left: 49px !important;
}

.mdi-chevron-down::before {
  display: none;
}

@media (max-width: 59.999em) {
  .v-application .visible-md-and-up {
    display: none !important;
  }
}
/* @media (min-width: 59.999em) {
} */

</style>
