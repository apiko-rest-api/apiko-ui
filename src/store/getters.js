import _ from 'lodash'

export default {
  // returns a collection's setup
  collection: state => name => {
    return state.setup.collections[name] || {}
  },

  // returns a property's setup
  property: (state, getters) => (collectionName, name) => {
    const collection = getters.collection(collectionName)
    return collection[name] || {}
  },

  // returns an endpoint's setup
  endpoint: state => path => {
    return state.setup.endpoints[path] || {}
  },

  // is collection part of core ?
  isCoreCollection: state => name => {
    if (typeof state.core.collections[name] === 'undefined') {
      return 'custom'
    }
    if (_.isEqual(state.core.collections[name], state.setup.collections[name])) {
      return 'core'
    } else {
      return 'overridden'
    }
  },

  // is property part of core ?
  isCoreProperty: state => (collection, name) => {
    if (typeof state.core.collections[collection] === 'undefined') {
      return 'custom'
    }
    if (typeof state.core.collections[collection][name] === 'undefined') {
      return 'custom'
    }
    if (_.isEqual(state.core.collections[collection][name], state.setup.collections[collection][name])) {
      return 'core'
    } else {
      return 'overridden'
    }
  },

  // is endpoint part of core ?
  isCoreEndpoint: state => path => {
    if (typeof state.core.endpoints[path] === 'undefined') {
      return 'custom'
    }
    if (_.isEqual(state.core.endpoints[path], state.setup.endpoints[path])) {
      return 'core'
    } else {
      return 'overridden'
    }
  },

  // is endpoint param part of core ?
  isCoreEndpointParam: state => (path, name) => {
    if (typeof state.core.endpoints[path] === 'undefined') {
      return 'custom'
    }
    if (typeof state.core.endpoints[path].params[name] === 'undefined') {
      return 'custom'
    }
    if (_.isEqual(state.core.endpoints[path].params[name], state.setup.endpoints[path].params[name])) {
      return 'core'
    } else {
      return 'overridden'
    }
  },

  // returns existing user roles
  rolesList: state => {
    let roles = ['admin', 'moderator']
    for (let end in state.setup.endpoints) {
      let restrict = state.setup.endpoints[end].restrict
      if (restrict && Array.isArray(restrict)) {
        restrict.forEach((role) => {
          if (roles.indexOf(role) === -1) {
            roles.push(role)
          }
        })
      }
    }
    return roles
  }
}
