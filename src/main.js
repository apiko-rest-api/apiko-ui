import Vue from 'vue'

// internal libraries
import store from './store'
import router from './router'

// components
import App from './App'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
  created () {
    // go straight to the config page on app startup
    this.$router.push({
      path: '/config',
      query: {
        redirect: this.$route.path
      }
    })
  }
})
