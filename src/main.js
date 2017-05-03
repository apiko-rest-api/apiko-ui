import Vue from 'vue'

// internal libraries
import store from './store'
import router from './router'

// css
require('bulma/css/bulma.css')
require('font-awesome/css/font-awesome.min.css')
require('./assets/css/app.css')

// ElementUI
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI, { locale })

// docs
import DocsBase from './components/docs/Base'
Vue.component('doc', DocsBase)

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
var vm = new Vue({
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

    // confirm exit if it have unsaved changes
    window.addEventListener('beforeunload', event => {
      if (this.$store.state.setupIsDifferent) {
        const confirmMessage = 'It looks like you have been editing something.\nIf you leave before saving, your changes will be lost'

        event.returnValue = confirmMessage
        return confirmMessage
      }
    })
  }
})

window.vm = vm
