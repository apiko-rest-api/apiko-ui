<template>
  <div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter"><CollectionsList></CollectionsList></div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>{{collection}}</h1>
              <p v-if="collection === 'users'">The user collection is required for user authentication and authorization. It can't be removed.</p>
            </div>
          </div>
        </div>
        <div class="card" style="margin-top: 20px;">
          <div class="card-content">
            <div class="content">
              <h3>Properties</h3>
              <table v-if="properties" class="table is-striped">
                <thead>
                  <tr><th>Name</th><th>Database Type</th><th></th></tr>
                </thead>
                <tbody>
                  <tr v-for="(type, name) in properties">
                    <td>{{name}}</td>
                    <td>{{type}}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <p v-else>No properties in this collection. Time to add some.</p>
              <button class="button is-primary is-small"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD PROPERTY</span></button>
            </div>
          </div>
        </div>
        <div class="card" style="margin-top: 20px;">
          <div class="card-content">
            <div class="content">
              <h3>Data</h3>
              <p v-if="setupsDifferent">In order to manually update data on this server, the server's setup (which includes database structure) must be updated first. Please save all changes made to this server's setup using the SAVE SETUP button in the menu bar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionsList from '../components/CollectionsList'

export default {
  components: {
    CollectionsList
  },
  computed: {
    properties () {
      var p = null

      // reflect core properties if this collection is core
      switch (this.$route.params.id) {
        case 'users':
          p = {
            id: 'INTEGER',
            username: 'STRING 100',
            password: 'STRING 100'
          }
          break
      }

      var custom = this.customProperties()

      if (custom) {
        if (!p) {
          p = custom
        } else {
          p = {...custom}
        }
      }

      return p
    },
    collection () {
      return this.$route.params.id
    },
    setupsDifferent () {
      return !window.model.different()
    }
  },
  methods: {
    customProperties () {
      if (window.model.server.setup.collections) {
        if (window.model.server.setup.collections.users) {
          return window.model.server.setup.collections.users
        }
      }

      return null
    }
  }
}
</script>

<style scoped>
</style>
