module.exports = {
  storedValue (name, altValue) {
    var value = window.localStorage.getItem(name)

    if ((value === null) || (value === undefined)) {
      return altValue
    }

    return value
  },

  verified () {
    if (window.store.state.setup) {
      return true
    }

    return false
  },

  different () {
    if (this.server !== undefined) {
      if (JSON.stringify(window.store.state.setup) !== JSON.stringify(window.store.state.originalSetup)) {
        return true
      }
    }

    return false
  }
}
