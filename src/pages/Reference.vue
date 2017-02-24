<template>
<div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter"><EndpointsList ref="list" linkto="globalref"></EndpointsList></div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>API Reference</h1>
              Base URL <code>{{base}}</code>
              <EndpointReference v-for="(options, index) in coreEndpoints" :endpoint="index"></EndpointReference>
              <EndpointReference v-for="(options, index) in endpoints" :endpoint="index"></EndpointReference>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EndpointsList from '../components/EndpointsList'
import EndpointReference from '../components/EndpointReference'

export default {
  data () {
    return {
      endpoints: window.model.server.setup.endpoints
    }
  },
  components: {
    EndpointReference,
    EndpointsList
  },
  computed: {
    base () {
      return window.localStorage.getItem('base')
    },
    coreEndpoints () {
      if (window.model.server.core.endpoints) {
        return window.model.server.core.endpoints
      }

      return null
    }
  },
  methods: {
    link (endpoint) {
      return '/reference/' + encodeURIComponent(endpoint)
    }
  },
  beforeCreate () {
    console.log('Checking if endpoints objects exist...')

    if (!window.model.server.setup.endpoints) {
      console.log('Creating the endpoints object.')
      window.model.server.setup.endpoints = {}
    }
  }
}
</script>

<style scoped>
</style>
