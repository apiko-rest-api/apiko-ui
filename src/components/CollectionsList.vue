<template>
  <aside class="card">
    <div class="card-content">
      <div class="menu">
        <p class="menu-label">Collections</p>
        <ul class="menu-list">
          <li><router-link active-class="is-active" :to="link('users')"><strong>users</strong> <span class="tag is-light">core</span></router-link></li>
          <li><router-link active-class="is-active" :to="link('files')"><strong>files</strong> <span class="tag is-light">core</span></router-link></li>
          <li v-for="(collection, index) in collections"><router-link active-class="is-active" :to="link(index)"><strong>{{index}}</strong></router-link></li>
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
      collections: window.model.server.setup.collections
    }
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
