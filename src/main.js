// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import Model from './Model'
window.model = Model

import App from './App'
import Connect from './pages/Connect'
import Dashboard from './pages/Dashboard'
import Collection from './pages/Collection'
import Collections from './pages/Collections'
import Endpoint from './pages/Endpoint'
import Endpoints from './pages/Endpoints'
import Reference from './pages/Reference'
import Documentation from './pages/Documentation'

// API server root
axios.defaults.baseURL = 'http://localhost:5000'
window.axios = axios

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/connect', component: Connect, meta: { verification: false, menu: false } },
    { path: '/documentation', component: Documentation, meta: { verification: false, menu: true } },

    { path: '/dashboard', component: Dashboard, meta: { verification: true, menu: true } },
    { path: '/collections', component: Collections, meta: { verification: true, menu: true } },
    { path: '/collections/:id', component: Collection, meta: { verification: true, menu: true } },
    { path: '/endpoints', component: Endpoints, meta: { verification: true, menu: true } },
    { path: '/endpoint/:id', component: Endpoint, meta: { verification: true, menu: true } },
    { path: '/reference', component: Reference, meta: { verification: true, menu: true } },

    { path: '/', redirect: '/dashboard' }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('Redirecting:', from.fullPath, '=>', to.fullPath)

  if (to.matched.some(record => record.meta.verification)) {
    if (!window.model.verified()) {
      console.log('Redirecting to the Connect page, because this page (' + to.fullPath + ') needs connection info and there\'s none.')
      next('/connect')
    }
  }

  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  Model,
  el: '#app',
  render: h => h(App)
})
