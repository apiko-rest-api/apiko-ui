module.exports = {
  server: {
    setup: null,
    setupOriginal: null,
    core: {
      collections: {
        'users': {
          id: 'INTEGER',
          username: 'STRING 100',
          password: 'STRING 100',
          role: 'STRING 255'
        },
        'files': {
          id: 'INTEGER',
          mime: 'STRING 100',
          path: 'TEXT'
        }
      },
      endpoints: {
        'GET /users/login': {
          extendable: true,
          params: {
            username: {
              required: true,
              regex: '^\\S+\\@\\S+\\.\\S+$'
            },
            password: {
              required: true,
              regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'
            }
          },
          collection: 'users'
        },
        'GET /users': {
          extendable: true,
          collection: 'users'
        },
        'GET /users/:id': {
          extendable: true,
          params: {
            id: {
              required: true,
              regex: '^\\d{1,10}$'
            }
          },
          collection: 'users'
        },
        'POST /users': {
          extendable: true,
          params: {
            username: {
              required: true,
              regex: '^\\S+\\@\\S+\\.\\S+$'
            },
            password: {
              required: true,
              regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'
            }
          },
          collection: 'users'
        },
        'GET /files/:id': {
          extendable: true,
          params: {
            id: {
              required: true,
              regex: '^\\d{1,10}$'
            }
          }
        },
        'POST /files': {
          extendable: true
        },
        'GET /captcha': {
          extendable: true
        }
      }
    }
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
    if (this.server !== undefined) {
      if (JSON.stringify(this.server.setup) !== JSON.stringify(this.server.setupOriginal)) {
        return true
      }
    }

    return false
  }
}
