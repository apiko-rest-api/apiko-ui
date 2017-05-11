<template>
  <aside class="card">
    <div class="card-content">
      <div class="menu">
        <p class="menu-label">Endpoints</p>
        <div class="field">
          <label class="label">Text Filter</label>
          <input class='input' type="text" v-model='textFilter' placeholder="Enter filter text">
        </div>
        <div class="field">
          <label class="label">Method Filter</label>
          <span class="select">
            <select v-model='methodFilter'>
              <option v-for='method in methods'>{{ method }}</option>
            </select>
          </span>
        </div>
        <route-card :routes='groupRoutes'/>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import RouteCard from './RouteCard'

export default {
  data () {
    return {
      textFilter: '',
      methodFilter: 'NONE',
      methods: ['NONE', 'GET', 'POST', 'PUT', 'DELETE', 'CHECKOUT', 'COPY', 'HEAD', 'LOCK', 'MERGE', 'MKACTIVITY', 'MKCOL', 'MOVE', 'M-SEARCH', 'NOTIFY', 'OPTIONS', 'PATCH', 'PURGE', 'REPORT', 'SEARCH', 'SUBSCRIBE', 'TRACE', 'UNLOCK', 'UNSUBSCRIBE']
    }
  },
  computed: {
    ...mapState(['setup']),
    ...mapGetters(['isCoreEndpoint']),
    routeFromKeys () {
      if (!this.setup || !this.setup.endpoints) return []
      return Object.keys(this.setup.endpoints)
    },
    routeList () {
      let list = []
      let routeSplit
      for (let route of this.routeFromKeys) {
        routeSplit = route.split(' ')
        list.push({ 'method': routeSplit[0], 'route': routeSplit[1] })
      }
      if (this.textFilter !== '') {
        list = list.filter(e => {
          return e.route.indexOf(this.textFilter) > -1
        })
      }
      if (this.methodFilter !== 'NONE') {
        list = list.filter(e => {
          return e.method === this.methodFilter
        })
      }
      return list
    },

/** ===========================================================================
* groupRoutes
* =============================================================================
* Summary:
* This computed property works on a list of endpoints where each endpoint Object
* is represented as { route: '...', method: '...'}, converting it into a hash of
* routes containing a parent route as key and value as an object containing
* child routes with the key 'children'.
*
* The 'children' key contains an object where each key is the child route, and
* has the value of an array containing applicable methods on the said child
* route.
*
* example: input => [ { method: 'DELETE', route: '/users/:id' }]
*          output => { users: { children: { '/:id': ['DELETE'] } } }
* =============================================================================
*/

    groupRoutes () {
      let result = {}
      let chain = null
      let currentRoute = null
      let childRoute = null
      for (let routeObj of this.routeList) {
        chain = routeObj.route.substring(1).split('/')
        currentRoute = chain.shift()
        childRoute = this.routeFromArr(chain)
        if (
          result.hasOwnProperty(currentRoute) &&
          result[currentRoute].children &&
          !result[currentRoute].children.hasOwnProperty(childRoute)
        ) {
          result[currentRoute].children[childRoute] = [routeObj.method]
        } else if (
          result.hasOwnProperty(currentRoute) &&
          result[currentRoute].children &&
          result[currentRoute].children.hasOwnProperty(childRoute)
        ) {
          result[currentRoute].children[childRoute].push(routeObj.method)
        } else {
          result[currentRoute] = {
            children: {
              [childRoute]: [routeObj.method]
            }
          }
        }
      }
      return result
    }
  },
  methods: {
    link (path) {
      return {
        name: this.$route.name === 'endpoint-reference' ? 'endpoint-reference' : 'endpoint',
        params: {
          path
        }
      }
    },
    routeFromArr (routeArr) {
      return '/' + routeArr.join('/')
    }
  },
  components: {
    RouteCard
  }
}
</script>

<style scoped>
  .field {
    margin: .75rem 0;
  }
</style>
