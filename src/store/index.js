import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
import localStorage from 'store'

// axios instance with API's config
const api = axios.create({
  timeout: 2000
})

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
      state.showDocs = payload || !state.showDocs
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
      api.defaults.baseURL = state.apiUrl
      api.defaults.params = {
        secret: payload.secret
      }
      // store to local storage
      localStorage.set('config', payload)
    }
  },
  actions: {
    // connect to the API
    connect ({ commit, dispatch, state }, opts) {
      return api.get('/apiko/setup').then(res => {
        commit('SETUP', res.data)
        commit('ORIGINAL_SETUP', res.data)

        return api.get('/apiko/core').then(res => {
          commit('CORE', res.data)
        }).catch(err => {
          console.log('Tried to get core, but failed.', err)
        })
      })
    }
  }
})
