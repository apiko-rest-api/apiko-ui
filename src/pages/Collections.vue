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

              <h1>Collections</h1>

              <p v-if="showDocs">Collections are storages for data and work as a starting point for generating URL endpoints. Each collection is simply a database table. Select a collection from list on the left or create a new one.</p>

              <h3>Create a Collection</h3>
              <form @submit.prevent="createCollection" style="margin-bottom: 20px">
                <p class="control has-addons">
                  <input v-model="newCollectionName" class="input" size="36" type="text" placeholder="Lowercase collection name, e.g.: 'posts'">
                  <button type="submit" class="button is-primary">
                    <span class="icon"><i class="fa fa-plus-circle"></i></span>
                    <span>ADD</span>
                  </button>
                </p>
              </form>

              <div v-if="showDocs">
                <h3>Collections and Endpoints</h3>
                <p>Several URL endpoints are automatically generated for each collection you create. Imagine a database table like this one:</p>
                <table class="table is-striped is-bordered">
                  <thead>
                    <tr><th>id</th><th><span class="text-muted">Property:</span> username</th><th><span class="text-muted">Property:</span> city</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>john@example.com</td><td>Los Angeles</td></tr>
                    <tr><td>2</td><td>frank@example.net</td><td>San Francisco</td></tr>
                    <tr><td>3</td><td>jake@example.com</td><td>New York</td></tr>
                  </tbody>
                </table>
                <p>Right after creating a collection, endpoints like this one are generated: <code>/collectionName/:id</code> - replace <code>:id</code> with a row ID and the endpoint will return that row from the collection <em>collectionName</em> in the JSON format.</p>
                <p>Automatically generated endpoints can be modified and restricted under the <em>Endpoints</em> menu tab. They also come with a documentation, which can be found under the <em>Reference</em> tab within each endpoint's administration.</p>
                <h3>Core Collections</h3>
                <p>Some collections are required for Apiko to provide basic functionality. Those collections are labeled with <span class="tag is-light">core</span> and can't be removed, but you can add more properties to them.</p>
                <h3>Row Identification</h3>
                <p>Each collection contains an <code>id</code> property by default, which helps identifying the rows. This property is used for core stuff and can't be removed.</p>
                <h3>Validation</h3>
                <p>All values received in this API are validated while getting through the endpoints. There is no need to worry about validation here in collections. The types that you set to each property here are purely database descriptors. When you create endpoints, you set validation rules for each parameter received.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionsList from '../components/CollectionsList'
import { mapState } from 'vuex'

export default {
  components: {
    CollectionsList
  },
  data () {
    return {
      newCollectionName: ''
    }
  },
  methods: {
    createCollection () {
      this.$router.push('/collections/' + this.newCollectionName)
    }
  },
  computed: {
    ...mapState(['showDocs'])
  }
}
</script>

<style scoped>
</style>
