<template>
  <aside class="card">
    <div class="card-content">
      <div class="menu">

        <p class="menu-label">Collections</p>

        <ul class="menu-list">
          <li v-for="(properties, name) in setup.collections">
            <router-link active-class="is-active" :to="link(name)">
              <strong>{{name}}</strong>
              <span class="tag is-light">{{ isCoreCollection(name) }}</span>
            </router-link>
          </li>
        </ul>

      </div>
      <hr>
      <router-link class="button is-primary is-small" to="/collections"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD COLLECTION</span></router-link>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['setup']),
    ...mapGetters(['isCoreCollection'])
  },
  methods: {
    link (name) {
      return {
        name: this.$route.name === 'collection-data' ? 'collection-data' : 'collection',
        params: {
          id: name
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
