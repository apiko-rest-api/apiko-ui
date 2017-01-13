<template>
  <div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter"><CollectionsList></CollectionsList></div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>Collections</h1>
              <p>Collections are storages for data and work as a starting point for generating URL endpoints. Each collection is simply a database table. Select a collection from list on the left or create a new one.</p>
              <h3>Core Collections</h3>
              <p>Some collections are required for Apiko to provide basic functionality. Those collections are labeled with <span class="tag is-light">core</span> and can't be removed, but you can add more properties to them.</p>
              <h3>Validation</h3>
              <p>All values received in this API are validated while getting through the endpoints. There is no need to worry about validation here in collections. The types that you set to each property here are purely database descriptors. When you create endpoints, you set validation rules for each parameter received.</p>
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
  }
}
</script>

<style scoped>
</style>
