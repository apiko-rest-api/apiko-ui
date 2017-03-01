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
  data () {
    return {
      collections: this.$store.state.setup.collections
    }
  },
  computed: {
    coreEndpoints () {
      if (this.$store.state.core.endpoints) {
        return this.$store.state.core.endpoints
      }

      return null
    },
    endpoints () {
      if (this.$store.state.setup.endpoints) {
        return this.$store.state.setup.endpoints
      }

      return null
    }
  },
  methods: {
    link (name) {
      return {
        name: this.$route.name === 'endpoint-reference' ? 'endpoint-reference' : 'endpoint',
        params: {
          id: name
        }
      }
    },
    isCore (endpoint) {
      if (this.$store.state.core.endpoints[endpoint]) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
</style>
