<template>
  <aside class="card">
    <div class="card-content">
      <div class="menu">
        <p class="menu-label">Collections</p>
        <ul class="menu-list">
          <li v-for="(collection, index) in core"><router-link active-class="is-active" :to="link(index)"><strong>{{index}}</strong> <span class="tag is-light">core</span></router-link></li>
          <li v-for="(collection, index) in custom" v-if="!isCore(index)"><router-link active-class="is-active" :to="link(index)"><strong>{{index}}</strong></router-link></li>
        </ul>
      </div>
      <hr>
      <router-link class="button is-primary is-small" to="/collections"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD COLLECTION</span></router-link>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['linktodata'],
  components: {
  },
  data () {
    return {
      core: this.$store.state.core.collections,
      custom: this.$store.state.setup.collections
    }
  },
  methods: {
    link (collection) {
      if (this.linktodata) {
        return '/collections/' + collection + '/data'
      }

      return '/collections/' + collection
    },
    isCore (collection) {
      if (this.$store.state.core.collections[collection]) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
</style>
