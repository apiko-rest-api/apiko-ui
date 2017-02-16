import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
import localStorage from 'store'

export default new Vuex.Store({
  state: {
    loading: false,
    apiUrl: null,
    config: {
      protocol: null,
      host: null,
      port: null,
      prefix: null,
      secret: null
    },
    originalSetup: null,
    setup: {
      collections: {},
      endpoints: {}
    },
    core: null,
    showDocs: true
  },
  getters: {
    setupIsDifferent (state) {
      return state.setup !== state.originalSetup
    }
  },
  mutations: {
    toggleLoading (state, truth) {
      state.loading = truth
    },
    'SHOW_DOCS' (state, payload) {
      if (payload) {
        state.showDocs = payload
      } else {
        state.showDocs = !state.showDocs
      }
      // store to local storage
      localStorage.set('showDocs', state.showDocs)
    },
    'SETUP': (state, payload) => {
      state.setup = payload
    },
    'ORIGINAL_SETUP': (state, payload) => {
      state.originalSetup = payload
    },
    'CORE': (state, payload) => {
      state.core = payload
    },
    'CONFIG': (state, payload) => {
      state.config = { ...state.config, ...payload }
      // set API's URL
      state.apiUrl = payload.protocol + payload.host
      if (payload.port) {
        state.apiUrl += ':' + payload.port
      }
      if (payload.prefix) {
        state.apiUrl += '/' + payload.prefix
      }
      // set axios base URL
      axios.defaults.baseURL = state.apiUrl
      // store to local storage
      localStorage.set('config', payload)
    }
  },
  actions: {
    // connect to the API
    connect ({ commit, dispatch, state }, opts) {
      console.log('Connecting to: %s, %s a secret...', state.apiUrl, (state.config.secret ? 'with' : 'without'))

      return dispatch('get', {
        path: '/apiko/setup'
      }).then(res => {
        commit('SETUP', res.data)
        commit('ORIGINAL_SETUP', res.data)

        return dispatch('get', {
          path: '/apiko/core'
        }).then(res => {
          commit('CORE', res.data)
        }).catch(err => {
          console.log('Tried to get core, but failed.', err)
        })
      })
    },
    // AJAX request, don't use directly, use the wrappers below
    request ({ commit, state }, opts) {
      var config = {}

      if (!opts.args) {
        opts.args = {}
      }

      console.log(opts.method.toUpperCase(), opts.path, 'Params:', opts.args)

      if (opts.loading !== false) {
        commit('toggleLoading', true)
      }

      // prepare path
      let url = state.apiUrl + opts.path
      if (state.config.secret) {
        url += '?secret=' + state.config.secret
      }

      return axios[opts.method](url, opts.args, config)
        .then((response) => {
          console.log('HTTP OK:', response)

          if (opts.loading !== false) {
            commit('toggleLoading', false)
          }

          return response
        })
        .catch((error) => {
          console.warn('HTTP ERR:', error)

          if (opts.loading !== false) {
            commit('toggleLoading', false)
          }

          return error
        })
    },

    // GET
    get ({ dispatch }, opts) {
      opts.method = 'get'
      return dispatch('request', opts)
    },

    // POST
    post ({ dispatch }, opts) {
      opts.method = 'post'
      return dispatch('request', opts)
    },

    // PUT
    put ({ dispatch }, opts) {
      opts.method = 'put'
      return dispatch('request', opts)
    },

    // DELETE
    delete ({ dispatch }, opts) {
      opts.method = 'delete'
      return dispatch('request', opts)
    }
  }
})
