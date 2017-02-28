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

              <doc name="collections1"></doc>

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

              <doc name="collections2"></doc>

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
  data () {
    return {
      newCollectionName: ''
    }
  },
  methods: {
    createCollection () {
      this.$store.commit('CREATE_COLLECTION', this.newCollectionName)
      this.$router.push('/collections/' + this.newCollectionName)
    }
  }
}
</script>
