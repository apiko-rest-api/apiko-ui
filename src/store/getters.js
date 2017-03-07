export default {
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
  },

  // returns an endpoint's setup
  endpoint: state => path => {
    let endpoint = {
      core: {},
      setup: {}
    }
    if (typeof state.core.endpoints[path] !== 'undefined') {
      endpoint.core = state.core.endpoints[path]
    }
    if (typeof state.setup.endpoints[path] !== 'undefined') {
      endpoint.setup = state.setup.endpoints[path]
    }
    return endpoint
  }
}
