<template>
  <div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter"><EndpointsList ref="list" :linkto="currentListLink"></EndpointsList></div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">

              <p class="control has-addons is-pulled-right">
                <router-link class="button" active-class=" is-primary" :to="paramsLink" exact>
                  <span class="icon is-small">
                    <i class="fa fa-cog"></i>
                  </span>
                  <span>CONFIGURATION</span>
                </router-link>
                <router-link class="button" active-class=" is-primary" :to="referenceLink">
                  <span class="icon is-small">
                    <i class="fa fa-pencil-square-o"></i>
                  </span>
                  <span>DOCS</span>
                </router-link>
              </p>

              <h1>{{this.$route.params.id}}</h1>

              <div v-if="isParamsLink">
                <p v-if="coreEndpoint && showDocs">Core endpoint, can't be removed. You can only alter the parameters.</p>

                <h2>Access</h2>
                <doc name="endpoint1"></doc>

                <div class="control is-grouped">
                  <p class="control has-addons is-expanded">
                    <a v-if="roles && login" @click="toggle('login')" class="button is-primary">RESTRICTED FOR</a>
                    <a v-if="login && !roles" @click="toggle('login')" class="button is-primary">REQUIRES LOGIN</a>
                    <a v-if="!login" @click="toggle('login')" class="button">UNRESTRICTED</a>
                    <input v-model="roles" class="input is-expanded" type="text" :disabled="rolesDisabled" placeholder="Comma-separated list of roles, e.g.: 'moderator,admin'">
                  </p>
                </div>

                <doc name="endpoint2"></doc>

                <h2>Parameters</h2>
                <table class="table is-striped" v-if="core || custom">
                  <thead>
                    <tr><th>Name</th><th>Validation</th><th></th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="(param, name) in core">
                      <td><strong>{{name}}</strong> <span v-if="param.required" class="tag is-dark">required</span></td>
                      <td v-if="param.regex"><code>{{param.regex}}</code></td><td v-else><span class="tag is-danger">none</span></td>
                      <td><span class="tag is-light">core</span></td>
                    </tr>
                    <tr v-for="(param, name) in custom">
                      <td><strong>{{name}}</strong> <span v-if="param.required" class="tag is-dark">required</span></td>
                      <td v-if="param.regex"><code>{{param.regex}}</code></td><td v-else><span class="tag is-danger">none</span></td>
                      <td><button @click="removeParam(name)" class="button is-danger is-small is-inverted"><span class="icon"><i class="fa fa-times"></i></span></button></td>
                    </tr>
                  </tbody>
                </table>
                <p v-else>There are no parameters defined for this endpoint.</p>

                <h4>Add<span v-if="core || custom"> / Change</span> a Parameter</h4>
                <doc name="endpoint3"></doc>
                <form ref="editForm" @submit.prevent="edit">
                  <div class="control is-grouped">
                    <p class="control is-expanded">
                      <input v-model="editParamName" class="input" type="text" placeholder="Lowercase name, e.g.: 'author'">
                    </p>
                    <p class="control is-expanded">
                      <input v-model="editParamRegex" class="input" type="text" placeholder="Validation regular expression">
                    </p>
                  </div>
                  <div class="control is-grouped">
                    <p class="control">
                      <span class="select">
                        <select @change="applyPreset">
                          <option value="-1">CUSTOM REGEX</option>
                          <option v-for="(preset, index) in presets" :value="index">{{preset.title}}</option>
                        </select>
                      </span>
                    </p>
                    <p class="control">
                      <a v-if="editParamRequired" class="button is-primary" @click="toggle('editParamRequired')">IS REQUIRED</a>
                      <a v-else class="button" @click="toggle('editParamRequired')">IS OPTIONAL</a>
                    </p>
                    <p class="control">
                      <button type="submit" class="button is-primary"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD</span></button>
                    </p>
                  </div>
                  <p><small v-if="currentRegexDesc">{{currentRegexDesc}}</small></p>
                </form>

                <doc name="endpoint4"></doc>

                <div v-if="!coreEndpoint">
                  <h2>Removal</h2>
                  <doc name="endpoint5"></doc>
                  <button @click="remove()" class="button is-danger is-outlined"><span class="icon"><i class="fa fa-times"></i></span><span>REMOVE ENDPOINT</span></button>
                </div>
              </div>
              <div v-else>
                <EndpointReference :endpoint="this.$route.params.id"></EndpointReference>
              </div>
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
import { mapState } from 'vuex'

export default {
  components: {
    EndpointsList,
    EndpointReference
  },
  data () {
    return {
      editParamName: '',
      editParamRequired: false,
      editParamRegex: '',

      login: false,
      roles: '',

      currentRegexDesc: '',

      presets: [
        { title: 'Any string 1-100 chars', regex: '^.{1,10}$', desc: 'Any string between 1 and 100 characters.' },
        { title: 'Number 1-10 digits', regex: '^\\d{1,10}$', desc: 'A number with the maximum of 10 digits. A 32 bit integer is 2,147,483,647 at max.' },
        { title: 'Basic username', regex: '^[a-z0-9_\\.]{3,16}$', desc: 'Such string may contain lowercase characters, numbers, dots, underscores and may be 3 to 16 chaters long.' },
        { title: 'Email simple', regex: '^\\S+\\@\\S+\\.\\S+$', desc: 'Simple email only checking for something@something.something' },
        { title: 'Password 8+ al-nu up-lo', regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$', desc: 'Password 8 chars or longer, at least one lowercase, at least one capital, at least one number.' },
        { title: 'Tag / slug', regex: '^[a-z0-9-]+$', desc: 'Any word that may include hyphens, e.g. apiko-ui or api-reference' },
        { title: 'Hex color', regex: '^#?([a-f0-9]{6}|[a-f0-9]{3})$', desc: 'Any hexadecimal number of 3 or 6 digits, starting with #.' },
        { title: 'URL', regex: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$', desc: 'Any string that looks like a URL.' }
      ]
    }
  },
  computed: {
    coreEndpoint () {
      if (this.$store.state.core.endpoints[this.$route.params.id] < 0) {
        return false
      }
      return true
    },
    core () {
      if (this.$store.state.core.endpoints[this.$route.params.id].params) {
        return this.$store.state.core.endpoints[this.$route.params.id].params
      }

      return null
    },
    custom () {
      console.log('Custom', this.$route.params.id)
      if (this.$store.state.setup.endpoints[this.$route.params.id].params) {
        return this.$store.state.setup.endpoints[this.$route.params.id].params
      }
      return null
    },
    paramsLink () {
      return '/endpoints/' + encodeURIComponent(this.$route.params.id)
    },
    referenceLink () {
      return '/endpoints/' + encodeURIComponent(this.$route.params.id) + '/reference'
    },
    isParamsLink () {
      if (this.$route.fullPath === '/endpoints/' + encodeURIComponent(this.$route.params.id)) {
        return true
      }

      return false
    },
    currentListLink () {
      if (this.isParamsLink) {
        return ''
      }

      return 'localref'
    },
    rolesDisabled () {
      if (this.login) {
        return false
      }
      return true
    },
    ...mapState(['showDocs'])
  },
  methods: {
    applyPreset (event) {
      var index = event.target.value
      if (this.presets[index]) {
        this.currentRegexDesc = this.presets[index].desc
        this.editParamRegex = this.presets[index].regex
      }
    },
    toggle (prop) {
      this[prop] = !this[prop]
    },
    edit () {
      var param = {
        regex: this.editParamRegex,
        required: this.editParamRequired
      }

      if (!this.$store.state.setup.endpoints[this.$route.params.id].params) {
        this.$store.state.setup.endpoints[this.$route.params.id].params = {}
      }

      this.$store.state.setup.endpoints[this.$route.params.id].params[this.editParamName] = param

      console.log('New params:', this.$store.state.setup.endpoints[this.$route.params.id].params)

      this.$forceUpdate()
      this.$refs.list.$forceUpdate()
      this.$parent.setupsChanged()
      this.$refs.editForm.reset()
    }
  },
  watch: {
    access () {
      console.log('Access changed.')
    }
  },
  beforeCreate () {
    console.log('Checking if this endpoint objects exist...')

    if (!this.$store.state.setup.endpoints[this.$route.params.id]) {
      console.log('Creating the actual endpoint.', this.$route.params.id)
      this.$store.state.setup.endpoints[this.$route.params.id] = {
        params: null
      }
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 0 !important;
}
</style>
