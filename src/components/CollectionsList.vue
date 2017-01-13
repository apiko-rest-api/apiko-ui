<template>
  <aside class="card">
    <div class="card-content">
      <div class="menu">
        <p class="menu-label">Collections</p>
        <ul class="menu-list">
          <li><router-link active-class="is-active" to="/collections/users"><strong>users</strong> <span class="tag is-light">core</span></router-link></li>
          <li v-for="(collection, index) in collections"><a>{{index}}</a></li>
        </ul>
      </div>
      <hr>
      <button class="button is-primary is-small"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD COLLECTION</span></button>
    </div>
  </aside>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      collections: null
    }
  },
  watch: {
    collections () {
      window.model.server.setup.collections = this.collections
    }
  },
  mount () {
    this.collections = window.model.server.setup.collections
  }
}
</script>

<style scoped>
</style>
