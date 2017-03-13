<template>
  <div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter">
        <CollectionsList></CollectionsList>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">

              <p class="control has-addons is-pulled-right">

                <router-link class="button" active-class=" is-primary" :to="{name: 'collection', params: {id: name}}" exact>
                  <span class="icon is-small">
                    <i class="fa fa-cog"></i>
                  </span>
                  <span>CONFIGURATION</span>
                </router-link>

                <router-link class="button" active-class=" is-primary" :to="{name: 'collection-data', params: {id: name}}">
                  <span class="icon is-small">
                    <i class="fa fa-database"></i>
                  </span>
                  <span>DATA</span>
                </router-link>

              </p>

              <h1>{{ this.name }}</h1>

              <p v-if="this.name === 'users' && showDocs">The user collection is required for user authentication and authorization. It can't be removed.</p>

              <doc name="collection"></doc>

              <table class="table is-striped">
                <thead>
                  <tr><th>Name</th><th>Database Type</th><th></th></tr>
                </thead>
                <tbody>
                  <tr v-for="(prop, propName) in collection(name)">
                    <template v-if="editProperty === propName">
                      <td colspan="3" class="edit-property">
                        <collection-property :collection="name" :name="propName" @save="propertyEdited"></collection-property>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <strong>{{propName}}</strong>
                        <div v-if="prop.comment">
                          <small v-if="prop.comment" class="text-muted">{{prop.comment}}</small>
                        </div>
                      </td>
                      <td>
                        {{prop.type}}
                      </td>
                      <td v-if="isCoreProperty(name, propName) === 'core'">
                        <span class="tag is-light">core</span>
                      </td>
                      <td v-else>
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
      properties: {},
      // property that is currently edited
      editProperty: null
    }
  },
  computed: {
    ...mapGetters(['collection', 'isCoreProperty']),
    ...mapState(['showDocs']),
    name () {
      return this.$route.params.id
    }
  },
  methods: {
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
