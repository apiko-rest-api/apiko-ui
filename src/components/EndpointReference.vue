<template>
  <div>
    Reference {{endpoint}}
  </div>
</template>

<script>
export default {
  props: ['endpoint'],
  data () {
    return {
      main: '',
      params: window.model.server.setup.endpoints[this.$route.params.id].params
    }
  },
  beforeCreate () {
    console.log('Checking if endpoints and this endpoint objects exist...')

    if (!window.model.server.setup.endpoints) {
      console.log('Creating the endpoints object.')
      window.model.server.setup.endpoints = {}
      this.$parent.setupChanged()
    }

    if (!window.model.server.setup.endpoints[this.$route.params.id]) {
      console.log('Creating the actual endpoint.', this.$route.params.id)
      window.model.server.setup.endpoints[this.$route.params.id] = {
        params: null
      }
      this.$parent.setupChanged()
    }
  }
}
</script>

<style scoped>
</style>
