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
  // INITIAL STATE
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
    core: {
      collections: {},
      endpoints: {}
    },
    setup: {
      collections: {},
      endpoints: {}
    },
    showDocs: localStorage.get('showDocs')
  },

  // GETTERS
  getters: {
    setupIsDifferent (state) {
      return state.setup !== state.originalSetup
    },
    // returns a collection's setup
    collection: state => name => {
      let collection = {
        core: {},
        setup: {}
      }
      if (typeof state.core.collections[name] !== 'undefined') {
        collection.core = state.core.collections[name]
      }
      if (typeof state.setup.collections[name] !== 'undefined') {
        collection.setup = state.setup.collections[name]
      }
      return collection
    },
    // returns a property's setup
    property: (state, getters) => (collectionName, name) => {
      const collection = getters.collection(collectionName)
      if (!collection || !collection.setup || typeof collection.setup[name] === 'undefined') {
        return null
      }
      return collection.setup[name]
    },
    // is collection part of core ?
    isCoreCollection: state => name => {
      return !!state.core.collections[name]
    }
  },

  // MUTATIONS
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
    },
    // update a property
    'UPDATE_PROPERTY' (state, payload) {
      if (typeof state.setup.collections[payload.collection] === 'undefined') {
        state.setup.collections[payload.collection] = {}
      }
      if (payload.originalName !== payload.name) {
        delete state.setup.collections[payload.collection][payload.originalName]
      }
      state.setup.collections[payload.collection][payload.name] = payload.prop
    },
    // remove a property
    'REMOVE_PROPERTY' (state, payload) {
      delete state.setup.collections[payload.collection][payload.name]
    },
    // create a new collection
    'CREATE_COLLECTION' (state, name) {
      state.setup.collections[name] = {
        id: {
          type: 'INTEGER'
        }
      }
      // TODO add a bunch of default endpoints
    }
  },

  // ACTION
  actions: {
    // connect to the API
    connect ({ commit, dispatch, state }) {
      return api.get('/apiko/setup').then(res => {
        commit('SETUP', res.data)
        commit('ORIGINAL_SETUP', res.data)

        return api.get('/apiko/core').then(res => {
          commit('CORE', res.data)
        })
      })
    }
  }
})
