import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Config from '../pages/Config'
import Dashboard from '../pages/Dashboard'
import Collection from '../pages/Collection'
import Collections from '../pages/Collections'
import Endpoint from '../pages/Endpoint'
import Endpoints from '../pages/Endpoints'
import Reference from '../pages/Reference'
import Documentation from '../pages/Documentation'
import CollectionData from '../pages/CollectionData'

export default new VueRouter({
  routes: [
    {
      path: '/config',
      component: Config,
      meta: {
        menu: false
      }
    },
    {
      path: '/documentation',
      component: Documentation,
      meta: {
        menu: true
      }
    },
    {
      path: '/',
      component: Dashboard,
      meta: {
        menu: true
      }
    },
    {
      path: '/collections',
      component: Collections,
      meta: {
        menu: true
      }
    },
    {
      path: '/collections/:id',
      component: Collection,
      meta: {
        menu: true
      }
    },
    {
      path: '/collections/:id/data',
      component: CollectionData,
      meta: {
        menu: true
      }
    },
    {
      path: '/endpoints',
      component: Endpoints,
      meta: {
        menu: true
      }
    },
    {
      path: '/endpoints/:id',
      component: Endpoint,
      meta: {
        menu: true
      }
    },
    {
      path: '/endpoints/:id/reference',
      component: Endpoint,
      meta: {
        menu: true
      }
    },
    {
      path: '/reference',
      component: Reference,
      meta: {
        menu: true
      }
    }
  ]
})
