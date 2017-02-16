import localStorage from 'store'
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
    // fetch config from local storage
    const originalConfig = localStorage.get('config')
    if (originalConfig) {
      this.$store.commit('CONFIG', originalConfig)
    }
    // connect to API, or redirect to config page
    this.$store.dispatch('connect').then(() => {
      this.$router.push('/')
    }).catch(() => {
      this.$router.push('/config')
    })
  }
})
