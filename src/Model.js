module.exports = {
  server: {
    setup: null,
    setupOriginal: null
  },

  loading: null,

  // AJAX GET
  get (path, showLoading, args) {
    var config = {}

    if (!args) {
      args = {}
    }

    if (showLoading !== false) {
      if (this.loading) {
        showLoading = true
      } else {
        showLoading = false
        console.log('Supposed to show loading, but this.loading is', this.loading)
      }
    }

    console.log('GET', path, 'Params:', args)

    if (showLoading) {
      this.loading.show = true
    }

    var p = window.axios.get(path, args, config)

    p.then((response) => {
      console.log('HTTP OK:', response)

      if (showLoading) {
        this.loading.show = false
      }
    })

    p.catch((error) => {
      console.warn('HTTP ERR:', error)

      if (showLoading) {
        this.loading.show = false
      }
    })

    return p
  },

  // AJAX POST
  post (path, finishedCallback, showLoading, args) {
    var config = {}

    if (!args) {
      args = {}
    }

    if (showLoading !== false) {
      if (this.loading) {
        showLoading = true
      } else {
        showLoading = false
        console.log('Supposed to show loading, but this.loading is', this.loading)
      }
    }

    console.log('POST', path, 'Params:', args)

    if (showLoading) {
      this.loading.show = true
    }

    var p = window.axios.post(path, args, config)

    p.then((response) => {
      console.log('HTTP OK:', response)

      if (showLoading) {
        this.loading.show = false
      }
    })

    p.catch((error) => {
      console.warn('HTTP ERR:', error)

      if (showLoading) {
        this.loading.show = false
      }
    })

    return p
  },

  storedValue (name, altValue) {
    var value = window.localStorage.getItem(name)

    if ((value === null) || (value === undefined)) {
      return altValue
    }

    return value
  },

  verified () {
    if (this.server.setup) {
      return true
    }

    return false
  },

  different () {
    if (JSON.stringify(this.server.setup) === JSON.stringify(this.server.setupOriginal)) {
      return true
    }

    return false
  }
}
