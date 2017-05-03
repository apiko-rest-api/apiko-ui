<template>
  <div class="endpoint-form-view-container">
    <h1>Endpoints</h1>

    <doc name="endpoints1"></doc>

    <h3>Create an Endpoint</h3>
    <endpoint-form @save="endpointCreated"></endpoint-form>

    <doc name="endpoints2"></doc>
  </div>
</template>

<script>
import EndpointForm from '../components/EndpointForm'

export default {
  components: {
    EndpointForm
  },
  data () {
    return {
      editMethod: 'GET',
      editPath: ''
    }
  },
  computed: {
    editUrl () {
      return '/endpoints/' + encodeURIComponent(this.editMethod + ' ' + this.editPath)
    }
  },
  methods: {
    endpointCreated (path) {
      this.$router.push({
        name: 'endpoint',
        params: { path }
      })
    }
  }
}

</script>

<style lang="css">
</style>
