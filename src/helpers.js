import store from './store'

module.exports = {
  storedValue (name, altValue) {
    var value = window.localStorage.getItem(name)

    if ((value === null) || (value === undefined)) {
      return altValue
    }

    return value
  },

  different () {
    if (this.server !== undefined) {
      if (JSON.stringify(store.state.setup) !== JSON.stringify(store.state.originalSetup)) {
        return true
      }
    }

    return false
  }
}
