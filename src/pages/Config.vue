<template>
  <div class="page centered">
    <div style="text-align: center; margin-bottom: 12px;">
      <img src="../assets/inappicon104x50.svg" alt="Apiko">
    </div>
    <article v-if="error" class="message is-warning">
      <div class="message-body">{{ error }}</div>
    </article>
    <form @submit.prevent="submit">
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
      return this.isConnecting ? 'button is-primary is-pulled-right is-loading' : 'button is-primary is-pulled-right'
    }
  },
  methods: {
    submit () {
      // save configuration in the store
      this.$store.commit('CONFIG', {
        protocol: this.protocol,
        host: this.host,
        port: this.port,
        prefix: this.prefix,
        secret: this.secret
      })

      // try to connect
      this.isConnecting = true
      this.$store.dispatch('connect').then(res => {
        // connect success
        this.$router.push('/')
      }).catch(err => {
        // connect failed
        this.isConnecting = false
        // TODO handle "get core" errors
        if (err.response && err.response.status === 401) {
          this.error = 'Tried connecting and succeed, but wasn\'t able to download the server\'s setup, because it is protected. Please enter your server\'s secret found in the file apiko.json in the root of your server.'
        } else {
          this.error = 'Tried connecting, but failed. It seems like this server is not in the default configuration or is not running. Please input the correct information below and try again. If you struggle, see the console for more information. (1)'
        }
      })
    }
  }
}
</script>
