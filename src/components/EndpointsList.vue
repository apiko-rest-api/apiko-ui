<template>
  <aside class="card">
    <div class="card-content">
      <div class="menu">
        <p class="menu-label">Endpoints</p>
        <ul class="menu-list">
          <li><router-link v-for="(options, endpoint) in coreEndpoints" active-class="is-active" :to="link(endpoint)" exact><strong>{{endpoint}}</strong> <span class="tag is-light">core</span></router-link></li>
          <li><router-link v-if="!isCore(endpoint)" v-for="(options, endpoint) in endpoints" active-class="is-active" :to="link(endpoint)" exact><strong>{{endpoint}}</strong></router-link></li>
        </ul>
      </div>
      <hr>
      <router-link class="button is-primary is-small" to="/endpoints"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD ENDPOINT</span></router-link>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['linkto'],
  components: {
  },
  data () {
    return {
      collections: window.model.server.setup.collections
    }
  },
  computed: {
    coreEndpoints () {
      if (window.model.server.core.endpoints) {
        return window.model.server.core.endpoints
      }

      return null
    },
    endpoints () {
      if (window.model.server.setup.endpoints) {
        return window.model.server.setup.endpoints
      }

      return null
    }
  },
  methods: {
    link (endpoint) {
      if (this.linkto === 'localref') {
        return '/endpoints/' + encodeURIComponent(endpoint) + '/reference'
      } else if (this.linkto === 'globalref') {
        return '/reference/' + encodeURIComponent(endpoint)
      }

      return '/endpoints/' + encodeURIComponent(endpoint)
    },
    isCore (endpoint) {
      if (window.model.server.core.endpoints[endpoint]) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
</style>
