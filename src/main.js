import Vue from 'vue'

// internal libraries
import store from './store'
import router from './router'

// css
require('./assets/css/app.css')

// docs
import DocsBase from './components/docs/Base'
Vue.component('doc', DocsBase)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h('router-view'),
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
