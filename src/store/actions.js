import _ from 'lodash'
import api from './api'

export default {
  // connect to the API
  connect ({ commit, dispatch, state }) {
    return api.get('/apiko/core').then(core => {
      commit('CORE', core.data)
      return api.get('/apiko/setup').then(setup => {
        let setupData = _.merge(core.data, setup.data)
        setupData = JSON.parse(JSON.stringify(setupData))
        commit('ORIGINAL_SETUP', setupData)
        commit('SETUP', setupData)
      })
    })
  },

  // save configuration
  setupSave ({ commit, state }) {
    console.log(state.setup.endpoints)
    return api.put('/apiko/setup', {
      setup: state.setup
    }).then(res => {
      commit('SETUP_SAVED')
    })
  }
}
