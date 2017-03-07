<template>
  <div>
    <p class="control">
      <input type="checkbox" v-model="restrict" @change="updateEndpointAccess">
      Restricted
    </p>
      <p class="control">
        <input v-model="roles" class="input is-expanded" type="text" :disabled="!restrict" placeholder="Comma-separated list of roles, e.g.: 'moderator,admin'" @change="updateEndpointAccess">
      </p>
  </div>
</template>

<script>
export default {
  props: ['path'],
  created () {
    this.getEndpointAccess()
  },
  watch: {
    path () {
      this.getEndpointAccess()
    }
  },
  data () {
    return {
      restrict: false,
      roles: ''
    }
  },
  methods: {
    getEndpointAccess () {
      const endpoint = this.$store.getters.endpoint(this.path)
      this.restrict = false
      this.roles = ''
      if (endpoint) {
        this.restrict = !!endpoint.restrict
        if (typeof endpoint.restrict === 'string') {
          this.roles = endpoint.restrict
        }
      }
    },
    updateEndpointAccess () {
      this.$store.commit('UPDATE_ENDPOINT_ACCESS', {
        path: this.path,
        restrict: this.restrict,
        roles: this.roles
      })
      this.$parent.$forceUpdate()
      this.$emit('save')
    }
  }
}
</script>
