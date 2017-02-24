<template>
  <div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter">
        <CollectionsList ref="list"></CollectionsList>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">

              <p class="control has-addons is-pulled-right">

                <router-link class="button" active-class=" is-primary" :to="{name: 'collection', params: {id: name}}" exact>
                  <span class="icon is-small">
                    <i class="fa fa-align-left"></i>
                  </span>
                  <span>PROPERTIES <span v-if="showDocs">(STRUCTURE)</span></span>
                </router-link>

                <router-link class="button" active-class=" is-primary" :to="{name: 'collection-data', params: {id: name}}">
                  <span class="icon is-small">
                    <i class="fa fa-database"></i>
                  </span>
                  <span>CONTENT <span v-if="showDocs">(DATA)</span></span>
                </router-link>

              </p>

              <h1>{{ this.name }}</h1>

              <p v-if="this.name === 'users' && showDocs">The user collection is required for user authentication and authorization. It can't be removed.</p>

              <p v-if="showDocs">Imagine properties are columns in a database table. Individual cells in the table will be then identified by their row ID and a property (column) name.</p>

              <table class="table is-striped">
                <thead>
                  <tr><th>Name</th><th>Database Type</th><th></th></tr>
                </thead>
                <tbody>
                  <tr v-for="(prop, propName) in properties.core">
                    <td><strong>{{propName}}</strong><br v-if="prop.comment"><small v-if="prop.comment" class="text-muted">{{prop.comment}}</small></td>
                    <td>{{prop.type}}</td>
                    <td><span class="tag is-light">core</span></td>
                  </tr>
                  <tr v-for="(prop, propName) in properties.setup">
                    <template v-if="editProperty === propName">
                      <td colspan="3" class="edit-property">
                        <collection-property :collection="name" :name="propName" @save="propertyEdited"></collection-property>
                      </td>
                    </template>
                    <template v-else>
                      <td><strong>{{propName}}</strong><br v-if="prop.comment"><small v-if="prop.comment" class="text-muted">{{prop.comment}}</small></td>
                      <td>{{prop.type}}</td>
                      <td>
                        <button @click="editProperty = propName" class="button is-danger is-inverted"><span class="icon"><i class="fa fa-edit"></i></span></button>
                        <button @click="removeProperty(propName)" class="button is-danger is-inverted"><span class="icon"><i class="fa fa-times"></i></span></button>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>

              <h5>Add Property</h5>
              <collection-property :collection="name" name="" @save="propertyCreated"></collection-property>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionProperty from '../components/CollectionProperty'
import CollectionsList from '../components/CollectionsList'
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    CollectionProperty,
    CollectionsList
  },
  data () {
    return {
      name: '',
      properties: {},
      // property that is currently edited
      editProperty: null
    }
  },
  computed: {
    ...mapState(['showDocs']),
    ...mapGetters(['collection'])
  },
  created () {
    this.getCollection(this.$route.params.id)
  },
  watch: {
    '$route.params.id' (name) {
      this.getCollection(name)
    }
  },
  methods: {
    getCollection (name) {
      this.name = name
      this.properties = this.$store.getters.collection(name)
      if (Object.keys(this.properties.core).length === 0 && Object.keys(this.properties.setup).length === 0) {
        this.$router.push('/collections')
      }
    },
    removeProperty (name) {
      this.$store.commit('REMOVE_PROPERTY', {
        collection: this.name,
        name
      })
      this.$forceUpdate()
    },
    propertyEdited () {
      this.editProperty = null
      this.$forceUpdate()
    },
    propertyCreated () {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 0 !important;
  text-transform: uppercase;
}
</style>
