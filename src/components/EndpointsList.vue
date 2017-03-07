<template>
  <aside class="card">
    <div class="card-content">
      <div class="menu">
        <p class="menu-label">Endpoints</p>
        <ul class="menu-list">
          <li>
            <router-link v-for="(options, path) in setup.endpoints" active-class="is-active" :to="link(path)" exact>
              <strong>{{ path }}</strong>
              <span class="tag is-light">{{ isCoreEndpoint(path) }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <hr>
      <router-link class="button is-primary is-small" to="/endpoints"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD ENDPOINT</span></router-link>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['setup']),
    ...mapGetters(['isCoreEndpoint'])
  },
  methods: {
    link (path) {
      return {
        name: this.$route.name === 'endpoint-reference' ? 'endpoint-reference' : 'endpoint',
        params: {
          path
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
