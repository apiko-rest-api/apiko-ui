import api from './api'

import localStorage from 'store'

export default {
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

  'SETUP_RESTORE': (state) => {
    state.setup = state.originalSetup
  },

  'SETUP_SAVED': (state) => {
    state.originalSetup = state.setup
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
  'UPDATE_COLLECTION_PROPERTY' (state, payload) {
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
  },

  // update an endpoint
  'UPDATE_ENDPOINT' (state, payload) {
    if (payload.originalPath !== payload.path) {
      delete state.setup.endpoints[payload.originalPath]
    }
    state.setup.endpoints[payload.path] = payload.endpoint
  },

  // update an endpoint
  'UPDATE_ENDPOINT_ACCESS' (state, payload) {
    if (typeof state.setup.endpoints[payload.path] === 'undefined') {
      state.setup.endpoints[payload.path] = {}
    }
    if (payload.restrict) {
      if (payload.roles) {
        state.setup.endpoints[payload.path].restrict = payload.roles
      } else {
        state.setup.endpoints[payload.path].restrict = true
      }
    } else {
      delete state.setup.endpoints[payload.path].restrict
    }
  },

  // update an endpoint param
  'UPDATE_ENDPOINT_PARAM' (state, payload) {
    if (typeof state.setup.endpoints[payload.path] === 'undefined') {
      state.setup.endpoints[payload.path] = {}
    }
    if (typeof state.setup.endpoints[payload.path].params === 'undefined') {
      state.setup.endpoints[payload.path].params = {}
    }
    if (payload.originalName !== payload.name) {
      delete state.setup.endpoints[payload.path].params[payload.originalName]
    }
    state.setup.endpoints[payload.path].params[payload.name] = payload.param
  },

  // remove an endpoint param
  'REMOVE_PARAM' (state, payload) {
    delete state.setup.endpoints[payload.path].params[payload.name]
  }
}
