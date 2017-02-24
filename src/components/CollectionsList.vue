<template>
  <aside class="card">
    <div class="card-content">
      <div class="menu">

        <p class="menu-label">Collections</p>

        <ul class="menu-list">
          <li v-for="(properties, name) in core.collections"><router-link active-class="is-active" :to="link(name)"><strong>{{name}}</strong> <span class="tag is-light">core</span></router-link></li>
          <li v-for="(properties, name) in setup.collections" v-if="!isCoreCollection(name)"><router-link active-class="is-active" :to="link(name)"><strong>{{name}}</strong></router-link></li>
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
  props: ['linktodata'],
  computed: {
    ...mapState(['core', 'setup']),
    ...mapGetters(['isCoreCollection'])
  },
  methods: {
    link (collection) {
      if (this.linktodata) {
        return '/collections/' + collection + '/data'
      }
      return '/collections/' + collection
    }
  }
}
</script>

<style scoped>
</style>
