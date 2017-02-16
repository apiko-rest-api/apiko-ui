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
                    <i class="fa fa-align-left"></i>
                  </span>
                  <span><span v-if="showDocs">URL PARAMETERS</span><span v-else>PARAMS</span></span>
                </router-link>
                <router-link class="button" active-class=" is-primary" :to="referenceLink">
                  <span class="icon is-small">
                    <i class="fa fa-pencil-square-o"></i>
                  </span>
                  <span><span v-if="showDocs">USAGE</span> REFERENCE</span>
                </router-link>
              </p>
              <h1>{{this.$route.params.id}}</h1>
              <div v-if="isParamsLink">
                <p v-if="coreEndpoint && showDocs">Core endpoint, can't be removed. You can only alter the parameters.</p>
                <h2>Access</h2>
                <p v-if="showDocs">Usage of each custom endpoint can be restricted by login or specific roles. Click the <strong>URESTRICTED</strong> button to require login and then type-in a comma-separated list of roles. A user must have <strong>one of</strong> these roles included in their <strong>role</strong> property (column) in order to be able to access this endpoint.</p>
                <div class="control is-grouped">
                  <p class="control has-addons is-expanded">
                    <a v-if="roles && login" @click="toggle('login')" class="button is-primary">RESTRICTED FOR</a>
                    <a v-if="login && !roles" @click="toggle('login')" class="button is-primary">REQUIRES LOGIN</a>
                    <a v-if="!login" @click="toggle('login')" class="button">UNRESTRICTED</a>
                    <input v-model="roles" class="input is-expanded" type="text" :disabled="rolesDisabled" placeholder="Comma-separated list of roles, e.g.: 'moderator,admin'">
                  </p>
                </div>
                <h5 v-if="showDocs">Example</h5>
                <p v-if="showDocs">Imagine the following data in the users collection</p>
                <table v-if="showDocs" class="table is-striped">
                  <thead>
                    <tr><th>id</th><th>...</th><th>roles</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><code>1</code></td><td>...</td><td><code>editor,moderator,storemanager,admin</code></td></tr>
                    <tr><td><code>2</code></td><td>...</td><td><code>editor,storemanager</code></td></tr>
                    <tr><td><code>3</code></td><td>...</td><td><code>editor,moderator</code></td></tr>
                    <tr><td><code>4</code></td><td>...</td><td><span class="text-muted">(empty)</span></td></tr>
                  </tbody>
                </table>
                <p v-if="showDocs">If you would restrict this endpoint by <code>admin,moderator</code>, only users <strong>1 and 3</strong> could use this endpoint, others would get the <em>403: Forbidden</em> HTTP error.</p>
                <h5 v-if="showDocs">Catpcha</h5>
                <p v-if="showDocs">Endpoints can also be protected by a captcha by switching the <strong>NO CAPTCHA</strong> button. In case of captcha protection, answer to the catpcha image must be supplied in the captcha parameter with each call to this endpoint. A captcha image can be retrieved before calling this endpoint from <code>GET /captcha</code>.</p>
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
                <p v-if="showDocs">Input an existing parameter name to change it or a new paramter name to add a new parameter to this endpoint.</p>
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
                <div v-if="showDocs" style="margin-top: 20px;">
                  <h4>Defined vs Undefined</h4>
                  <p>You can either define an endpoint here in the UI or define it in the code. Either way, you will have to create a coded handler function. The difference is in the parameters validation and documenting.</p>
                  <p>If you want to use the API Reference feature of Apiko, which automates the API documentation where possible, the endpoint has to be defined over this UI.</p>
                  <h4>Validation</h4>
                  <p>Handler functions for endpoints defined here in the UI receive already validated parameters in the <code>request.params</code> variable, while handlers for endpoints undefined here in the UI rececive the parameter values as received.</p>
                  <p>See the server's /main.js for a few quick examples.</p>
                  <pre><code>
Apiko.on('GET /collection/action', (request, store) => {
  // request.method contains the HTTP method received, uppercased, 'GET' in this case

  // Now two cases can happen here:

  // CASE 1: you have not defined the specified (URL) endpoint in Apiko GUI

  // Request parameters are stored in the request.params property and are
  // never validated. You have to validate them here.

  if (request.params.foo) {
  // In order to respond to the client, you need to call:
    request.respondSuccess({any: 'data'}) // 200 OK
  } else {
  // If you are not happy, you can respond with an error:
    request.respondError(400, 'Custom message', 76)
    // args: HTTP status code, custom message, custom error code, all optional
    // custom error codes should be > 100
  }

  // CASE 2: the specified (URL) endpoint is defined in Apiko GUI

  // The params will be processed according to your Apiko GUI validation
  // setup and this callback will never be called if they are invalid.

  // Furthermore, if the specified endpoint is a special endpoint processed
  // by Apiko itself (e.g. a user login at /users/login), the request.response
  // property will be present and will contain an object describing how would
  // Apiko normally respond to this request, for example:
  //
  // Error: { status: 401, message: 'The username parameter is missing.', code: 1 }
  // Success: { status: 200, data: { session: 's43v094ioag345...' }}

  // You always have to call request.respondSuccess() or request.respondError() in
  // this handler to make the web server respond!
})
                  </code></pre>
                </div>
                <div v-if="!coreEndpoint">
                  <h2>Removal</h2>
                  <p v-if="showDocs">Don't forget to <strong>SAVE</strong> to put the endpoint's removal in effect.</p>
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
