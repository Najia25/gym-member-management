<template>
  <v-app>
    <div class="logo primary">
      <router-link to="/" tag="span" style="cursor: pointer">
        <img src="@/assets/logo.png"/>
      </router-link>
    </div>
    <v-navigation-drawer v-model="sideNav" app dark>
      <v-list>
        <div class="online text-center">
          <v-icon>mdi-account-circle</v-icon>
          <p class="role">Manager</p>
          <small>online</small>
        </div>
        <v-list-item-group>

          <v-list-item link v-for="item in menuItems" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="onLogout">
            <v-list-item-icon>
              <v-icon> mdi-logout-variant </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Logout </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon class="visible-md-and-up"></v-app-bar-nav-icon >
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
  components: {
  },

  data: () => ({
    sideNav: true
  }),
  computed: {
    ...mapState(['user', 'adminExists']),
    menuItems () {
      let menuItems
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'mdi-home-outline', title: 'Home', link: '/' },
          { icon: 'mdi-account-plus-outline', title: 'Registration', link: '/registration' },
          { icon: 'mdi-account-outline', title: 'Profile', link: '/profile' }
        ]
      } else {
        if (this.adminExists) {
          menuItems = [
            { icon: 'mdi-account', title: 'Signin', link: '/signin' }
          ]
        } else {
          menuItems = [
            { icon: 'mdi-account', title: 'Signin', link: '/signin' },
            { icon: 'mdi-account', title: 'Signup', link: '/signup' }
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

/* header.primary.v-sheet.v-sheet--tile.theme--dark.v-toolbar.v-app-bar.v-app-bar--fixed {
  left:  0px !important;
  z-index: 6;
} */
nav.v-navigation-drawer.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--dark {
  top: 50px !important;
  width:230px !important;
}
.theme--dark.v-navigation-drawer {
  background-color: #191818;
}
.v-list-item-group .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #ffffffa6 !important;
}
.v-list.v-sheet.v-sheet--tile.theme--dark {
  padding: 0px;
}
.v-list-item__title {
  font-size: .875rem;
}
.v-list-item__icon .theme--dark.v-icon {
  color: #ffffffa6 !important;
}
.v-list-item-group .v-list-item .v-list-item__icon {
  margin-right: 10px !important;
}
.v-icon.v-icon {
  font-size: 21px !important;
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #191818 !important;
  color: #ffd600;
  left:230px !important;
  height: 50px !important;
}
.v-toolbar__content {
  height: 50px !important;
}
.v-content {
  padding: 50px 0px 0px 230px !important;
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
p.role {
    font-size: .89rem;
    color: #bab5b5;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 8px;
    margin-bottom: .5px !important;
}
.online {
    /* font-size: 2rem; */
    padding: 1rem;
    background: #0000004f;
    line-height: 22px;
}
i.v-icon.notranslate.mdi.mdi-account-circle.theme--dark {
    color: #ffd600;
    font-size: 1.5rem !important;
}
small {
  position: relative;
}
small::after {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    top: 2px;
    left: -15px;
    background: #0cae0c;
    border-radius: 100%;
    border: 1px solid #0cae0c;
}
.logo img {
  width:103px;
}
i.v-icon.notranslate.mdi.mdi-menu.theme--light {
  font-size: 34px !important;
}
.theme--light.v-btn.v-btn--icon {
  color: #ffd600 !important;
}
a.v-item--active.v-list-item--active.v-list-item.v-list-item--link.theme--dark {
  background: #191818 !important;
  border-left: 2px solid #ffd600;
}
.v-item--active .v-list-item__icon .theme--dark.v-icon {
    color: yellow !important;
}
.v-list-item--active .v-list-item__content {
  color: #ffd600;
}

.theme--dark.v-list-item--active:hover::before, .theme--dark.v-list-item--active::before {
  opacity: 0 !important;
  background-color: none;
}

/* @media screen and (max-width: 960px) {
  nav.v-navigation-drawer.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--dark {
    top: 55px !important;
  }
} */
@media (max-width: 59.999em) {
  .v-application .visible-md-and-up {
    display: none !important;
  }
    nav.v-navigation-drawer.v-navigation-drawer--close.v-navigation-drawer--fixed.v-navigation-drawer--is-mobile.theme--dark {
    transform: translateX(-100%) !important;
  }
}
/* @media (min-width: 59.999em) {

} */

</style>
