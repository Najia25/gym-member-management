import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCGL8FJrWbdn5aViCZTh3qPXv6IA3ZIAy4',
      authDomain: 'gym-management-system-3ee92.firebaseapp.com',
      databaseURL: 'https://gym-management-system-3ee92.firebaseio.com',
      projectId: 'gym-management-system-3ee92',
      storageBucket: 'gym-management-system-3ee92.appspot.com',
      messagingSenderId: '850584772597',
      appId: '1:850584772597:web:0e0eb51a1216bbcf380abc'
    })
    firebase.auth().onAuthStateChanged(data => {
      if (data) {
        this.$store.dispatch('fetchUserRole', data.uid)
      }
    })
    // this.$store.dispatch('fetchAdmin')
    this.$store.dispatch('loadMembers')
    this.$store.dispatch('adminExists')
  }
}).$mount('#app')
