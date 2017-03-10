import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/config',
      component: require('../pages/Config')
    },
    {
      path: '/',
      component: require('../pages/Layout'),
      children: [
        {
          path: '/',
          component: require('../pages/Dashboard')
        },
        {
          path: '/collections',
          component: require('../pages/Collections')
        },
        {
          name: 'collection',
          path: '/collections/:id',
          component: require('../pages/Collection')
        },
        {
          name: 'collection-data',
          path: '/collections/:id/data',
          component: require('../pages/CollectionData')
        },
        {
          path: '/endpoints',
          component: require('../pages/Endpoints')
        },
        {
          name: 'endpoint',
          path: '/endpoints/:path',
          component: require('../pages/Endpoint')
        },
        {
          name: 'endpoint-reference',
          path: '/endpoints/:path/reference',
          component: require('../pages/Endpoint')
        },
        {
          path: '/documentation',
          component: require('../pages/Documentation')
        },
        {
          path: '/stats',
          component: require('../pages/Stats')
        }
      ]
    }
  ]
})
