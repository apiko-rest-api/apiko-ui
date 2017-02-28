import Vue from 'vue'

// internal libraries
import store from './store'
import router from './router'

// components
import App from './App'

// docs
import DocsBase from './components/docs/Base'
Vue.component('doc', DocsBase)

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
