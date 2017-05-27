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
                <router-link class="button" active-class=" is-primary" :to="propertiesLink" exact>
                  <span class="icon is-small">
                    <i class="fa fa-cog"></i>
                  </span>
                  <span>CONFIGURATION</span>
                </router-link>
                <router-link class="button" active-class=" is-primary" :to="dataLink">
                  <span class="icon is-small">
                    <i class="fa fa-database"></i>
                  </span>
                  <span>DATA</span>
                </router-link>
              </p>

              <h1>{{this.$route.params.id}}</h1>

              <doc name="collection-data"></doc>
              <collections-data :url='propertiesLink'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionsList from '../components/CollectionsList'
import CollectionsData from '../components/CollectionsData'

export default {
  components: {
    CollectionsList,
    CollectionsData
  },
  computed: {
    dataLink () {
      return '/collections/' + this.$route.params.id + '/data'
    },
    propertiesLink () {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 0;
  text-transform: uppercase;
}
</style>
