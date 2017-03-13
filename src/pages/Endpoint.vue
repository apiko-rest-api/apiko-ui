<template>
  <div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter">
        <EndpointsList></EndpointsList>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">

              <p class="control has-addons is-pulled-right">
                <router-link class="button" active-class="is-primary" :to="{ name: 'endpoint', params: {id: this.path}}" exact>
                  <span class="icon is-small">
                    <i class="fa fa-cog"></i>
                  </span>
                  <span>CONFIGURATION</span>
                </router-link>
                <router-link class="button" active-class="is-primary" :to="{ name: 'endpoint-reference', params: {id: this.path}}">
                  <span class="icon is-small">
                    <i class="fa fa-pencil-square-o"></i>
                  </span>
                  <span>DOCS</span>
                </router-link>
              </p>

              <h1>{{ path }}</h1>

              <div v-if="$route.name === 'endpoint'">

                <h2>Access</h2>
                <doc name="endpoint1"></doc>

                <endpoint-access :path="path"></endpoint-access>

                <doc name="endpoint2"></doc>

                <h2>Parameters</h2>
                <table class="table is-striped" v-if="configuration.params">
                  <thead>
                    <tr><th>Name</th><th>Validation</th><th></th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="(param, name) in configuration.params">
                      <td>
                        <strong>{{name}}</strong>
                        <span v-if="param.required" class="tag is-dark">required</span>
                      </td>
                      <td v-if="param.regex">
                        <code>{{param.regex}}</code>
                      </td>
                      <td v-else>
                        <span class="tag is-danger">none</span>
                      </td>
                      <td v-if="isCoreEndpointParam(path, name) === 'core'">
                        <span class="tag is-light">core</span>
                      </td>
                      <td v-else>
                        <button @click="removeParam(name)" class="button is-danger is-small is-inverted"><span class="icon"><i class="fa fa-times"></i></span></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p v-else>There are no parameters defined for this endpoint.</p>

                <h4 style="margin-top: 30px">Add a Parameter</h4>
                <doc name="endpoint3"></doc>
                <endpoint-param :path="path"></endpoint-param>

                <doc name="endpoint4"></doc>

                <div v-if="isCoreEndpoint(path) ===  'core'" class="notification is-warning" style="margin-top: 30px">
                  This core endpoint <strong>can't be removed</strong>.
                </div>

                <div v-else>
                  <h2 style="margin-top: 30px">Removal</h2>
                  <doc name="endpoint5"></doc>
                  <button @click="removeEndpoint" class="button is-danger is-outlined"><span class="icon"><i class="fa fa-times"></i></span><span>REMOVE ENDPOINT</span></button>
                </div>
              </div>
              <div v-else>
                <EndpointReference :endpoint="path"></EndpointReference>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EndpointAccess from '../components/EndpointAccess'
import EndpointParam from '../components/EndpointParam'
import EndpointsList from '../components/EndpointsList'
import EndpointReference from '../components/EndpointReference'
import { mapGetters } from 'vuex'

export default {
  components: {
    EndpointAccess,
    EndpointParam,
    EndpointsList,
    EndpointReference
  },
  data () {
    return {
      // param that is currently edited
      editParam: null
    }
  },
  computed: {
    ...mapGetters(['endpoint', 'isCoreEndpoint', 'isCoreEndpointParam']),
    path () {
      return this.$route.params.path
    },
    configuration () {
      return this.endpoint(this.path)
    }
  },
  methods: {
    removeEndpoint () {
      this.$store.commit('REMOVE_ENDPOINT', {
        path: this.path
      })
      this.$router.push('/endpoints')
    },
    removeParam (name) {
      this.$store.commit('REMOVE_PARAM', {
        path: this.path,
        name
      })
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 0 !important;
}
</style>
