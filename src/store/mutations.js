import api from './api'

import Vue from 'vue'
import localStorage from 'store'

export default {
  'SHOW_DOCS' (state, payload) {
    state.showDocs = payload || !state.showDocs
    // store to local storage
    localStorage.set('showDocs', state.showDocs)
  },

  'SETUP': (state, payload) => {
    state.setupIsDifferent = false
    state.setup = payload
  },

  'ORIGINAL_SETUP': (state, payload) => {
    state.originalSetup = payload
  },

  'SETUP_REVERT': (state) => {
    state.setupIsDifferent = false
    state.setup = state.originalSetup
  },

  'SETUP_SAVED': (state) => {
    state.setupIsDifferent = false
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
    state.setupIsDifferent = true
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
    state.setupIsDifferent = true
    delete state.setup.collections[payload.collection][payload.name]
  },

  // create a new collection
  'CREATE_COLLECTION' (state, name) {
    state.setupIsDifferent = true
    state.setup.collections[name] = {
      id: {
        type: 'INTEGER'
      }
    }
  },

  // update an endpoint
  'UPDATE_ENDPOINT' (state, payload) {
    state.setupIsDifferent = true
    if (payload.originalPath !== payload.path) {
      delete state.setup.endpoints[payload.originalPath]
    }
    state.setup.endpoints[payload.path] = payload.endpoint
  },

  // remove an endpoint
  'REMOVE_ENDPOINT' (state, payload) {
    state.setupIsDifferent = true
    delete state.setup.endpoints[payload.path]
  },

  // update an endpoint
  'UPDATE_ENDPOINT_ACCESS' (state, payload) {
    state.setupIsDifferent = true

    if (typeof state.setup.endpoints[payload.path] === 'undefined') {
      state.setup.endpoints[payload.path] = {}
    }

    delete state.setup.endpoints[payload.path].restrict
    delete state.setup.endpoints[payload.path].ownership
    switch (payload.restrict) {
      case 'logged-in':
        Vue.set(state.setup.endpoints[payload.path], 'restrict', true)
        break
      case 'role-based':
        Vue.set(state.setup.endpoints[payload.path], 'restrict', payload.roles)
        if (payload.ownership === true) {
          Vue.set(state.setup.endpoints[payload.path], 'ownership', true)
        }
    }
  },

  // update an endpoint param
  'UPDATE_ENDPOINT_PARAM' (state, payload) {
    state.setupIsDifferent = true
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
    state.setupIsDifferent = true
    delete state.setup.endpoints[payload.path].params[payload.name]
  }
}
