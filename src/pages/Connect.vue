<template>
  <div class="page centered">
    <div style="text-align: center; margin-bottom: 12px;">
      <img src="../assets/inappicon104x50.svg" alt="Apiko">
    </div>
    <article v-if="error" class="message is-warning">
      <div class="message-body">{{error}}</div>
    </article>
    <form v-if="error" @submit.prevent="submit">
      <label class="label">Base URL <span style="font-weight: normal;">(and port)</span></label>
      <div class="control is-grouped">
        <p class="control has-addons">
          <span class="select">
            <select v-model="protocol">
              <option>http://</option>
              <option>https://</option>
            </select>
          </span>
          <input v-model="host" class="input is-expanded" type="text" placeholder="example.com">
        </p>
        <p class="control is-expanded">
          <input v-model="port" class="input is-expanded" type="text" placeholder="Port (optional)">
        </p>
      </div>
      <label class="label">Prefix</label>
      <p class="control">
        <input v-model="prefix" class="input" type="text" placeholder="E.g. 'api' (optional)">
      </p>
      <label class="label">Secret <span style="font-weight: normal;">(if config.protect is true)</span></label>
      <p class="control">
        <input v-model="secret" class="input" type="text" placeholder="The secret from apiko.json (optional)">
      </p>
      <button type="submit" :class="buttonClasses"><span>CONNECT</span><span class="icon"><i class="fa fa-chevron-circle-right"></i></span></button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      error: false,
      isConnecting: false,
      host: '',
      port: '',
      protocol: 'http://',
      prefix: '',
      secret: ''
    }
  },
  computed: {
    buttonClasses () {
      return (this.isConnecting ? 'button is-primary is-pulled-right is-loading' : 'button is-primary is-pulled-right')
    }
  },
  methods: {
    submit () {
      var base = this.protocol + this.host

      if (this.port) {
        base += ':' + this.port
      }

      if (this.prefix) {
        base += '/' + this.prefix
      }

      this.connect(base, this.secret)
    },
    connect (url, secret) {
      var secretParam
      if (secret) {
        secretParam = '?secret=' + secret
      } else {
        secretParam = ''
      }

      this.isConnecting = true

      console.log('Connecting to:', url, (secret ? 'with a secret...' : 'without a secret...'))

      this.$store.dispatch('get', {
        path: url + '/apiko/setup' + secretParam
      }).then((response) => {
        this.isConnecting = false
        this.error = ''

        console.log('Successfully connected.')
        this.$store.commit('updateSetup', response.data)

        // make sure the endpoints and collections objects exist
        if (!this.$store.state.setup.endpoints) {
          this.$store.state.setup.endpoints = {}
        }

        if (!this.$store.state.setup.collections) {
          this.$store.state.setup.collections = {}
        }

        this.$store.state.originalSetup = JSON.parse(JSON.stringify(this.$store.state.setup)) // a dirty hack to duplicate object

        window.localStorage.setItem('base', url)
        window.axios.defaults.baseURL = url
        if (secret) {
          window.localStorage.setItem('secret', secret)
        }

        this.$store.dispatch('get', {
          path: url + '/apiko/core' + secretParam
        }).then((responseCore) => {
          this.$store.commit('updateCore', responseCore.data)

          // redirect to the dashboard
          this.$router.push('/')
        }).catch(error => {
          console.log('Tried to get core, but failed.', error)
          this.error = 'Tried downloading the core collections and endpoints, but failed. Try restarting the server and reloading this UI.'
        })
      }).catch(error => {
        this.isConnecting = false

        if (error.response) {
          if (error.response.status === 401) {
            window.localStorage.setItem('base', url)
            window.axios.defaults.baseURL = url

            this.error = 'Tried connecting to ' + url + ' and succeed, but wasn\'t able to download the server\'s setup, because it is protected. Please enter your server\'s secret found in the file apiko.json in the root of your server.'

            // save the correct URL to the form values

            var base = url.split('/')

            if (base[0] === 'http:') {
              this.protocol = 'http://'
            } else {
              this.protocol = 'https://'
            }

            if (base[2]) {
              var host = base[2].split(':')
              this.host = host[0]

              if (host[1]) {
                this.port = host[1]
              }
            }

            if (base[3]) {
              this.prefix = base[3]
            }
          } else {
            this.error = 'Tried connecting to ' + url + ', but failed. It seems like this server is not in the default configuration or is not running. Please input the correct information below and try again. If you struggle, see the console for more information. (2)'
          }
        } else {
          this.error = 'Tried connecting to ' + url + ', but failed. It seems like this server is not in the default configuration or is not running. Please input the correct information below and try again. If you struggle, see the console for more information. (1)'
        }
      })
    }
  },
  mounted () {
    var savedBase = window.helpers.storedValue('base', false)
    var savedSecret = window.helpers.storedValue('secret', false)

    if (savedBase) {
      if (savedSecret) {
        this.connect(savedBase, savedSecret)
      } else {
        this.connect(savedBase)
      }
    } else {
      console.log('Trying to connect to http://localhost:5000 with no secret...')
      this.connect('http/localhost:5000')
    }
  }
}
</script>

<style scoped>
</style>
