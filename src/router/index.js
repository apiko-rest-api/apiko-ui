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
      component: require('../layout/Default'),
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
          component: require('../pages/Endpoints'),
          children: [
            {
              path: '/',
              component: require('../components/EndpointFormView')
            },
            {
              name: 'endpoint',
              path: '/endpoints/:path',
              component: require('../components/EndpointMethodView')
            },
            {
              name: 'endpoint-reference',
              path: '/endpoints/:path/reference',
              component: require('../components/EndpointMethodView')
            }
          ]
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
