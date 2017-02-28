<template>
  <form v-if="endpoint" @submit.prevent="updateEndpoint">

    <p class="control has-addons">
      <span class="select">
        <select v-model="endpoint.method">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>CHECKOUT</option>
          <option>COPY</option>
          <option>HEAD</option>
          <option>LOCK</option>
          <option>MERGE</option>
          <option>MKACTIVITY</option>
          <option>MKCOL</option>
          <option>MOVE</option>
          <option>M-SEARCH</option>
          <option>NOTIFY</option>
          <option>OPTIONS</option>
          <option>PATCH</option>
          <option>PURGE</option>
          <option>REPORT</option>
          <option>SEARCH</option>
          <option>SUBSCRIBE</option>
          <option>TRACE</option>
          <option>UNLOCK</option>
          <option>UNSUBSCRIBE</option>
        </select>
      </span>
      <input v-model="endpoint.path" class="input" size="36" type="text" placeholder="E.g.: /example or /example/action">
    </p>
    <p class="control">
      <button v-if="path === ''" type="submit" class="button is-primary"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD</span></button>
      <button v-else type="submit" class="button is-primary"><span class="icon"><i class="fa fa-floppy-o"></i></span><span>SAVE</span></button>
    </p>

  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['method', 'path'],
  computed: {
    ...mapState(['showDocs'])
  },
  created () {
    this.getEndpointData()
  },
  watch: {
    method () {
      this.getEndpointData()
    },
    path () {
      this.getEndpointData()
    }
  },
  data () {
    return {
      // endpoint definition
      endpoint: null
    }
  },
  methods: {
    getEndpointData () {
      // defaults
      this.endpoint = {
        method: 'GET',
        path: ''
      }
      // assign values
      if (this.method) {
        this.endpoint.method = this.method
      }
      if (this.path) {
        this.endpoint.path = this.path
      }
    },
    updateEndpoint () {
      // TODO check that path doesn't exist already
      this.$store.commit('UPDATE_ENDPOINT', {
        originalPath: this.path,
        path: this.endpoint.path,
        endpoint: {}
      })
      this.$parent.$forceUpdate()
      this.$emit('save')
    }
  }
}
</script>

<style scoped>
</style>
