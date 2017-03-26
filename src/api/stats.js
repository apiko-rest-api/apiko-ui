import api from '../store/api'

export default {
  getStatsList (params) {
    return api.get('/apiko/stats', { params })
  },

  getStatsCounter () {
    return api.get('/apiko/stats', {
      params: {
        only_counter: true
      }
    })
  }
}
