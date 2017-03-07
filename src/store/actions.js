import api from './api'

export default {
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
