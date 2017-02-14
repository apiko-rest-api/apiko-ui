import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    originalSetup: null,
    setup: null,
    core: null
  },
  mutations: {
    toggleLoading (state, truth) {
      state.loading = truth
    },
    updateSetup (state, setup) {
      state.setup = setup
    },
    updateCore (state, core) {
      state.core = core
    }
  },
  actions: {
    // AJAX request, don't use directly, use the wrappers below
    request ({ commit }, opts) {
      var config = {}

      if (!opts.args) {
        opts.args = {}
      }

      console.log(opts.method.toUpperCase(), opts.path, 'Params:', opts.args)

      if (opts.loading !== false) {
        commit('toggleLoading', true)
      }

      return window.axios[opts.method](opts.path, opts.args, config)
        .then((response) => {
          console.log('HTTP OK:', response)

          if (opts.loading !== false) {
            commit('toggleLoading', false)
          }
        })
        .catch((error) => {
          console.warn('HTTP ERR:', error)

          if (opts.loading !== false) {
            commit('toggleLoading', false)
          }
        })
    },

    // GET
    get ({ dispatch }, opts) {
      opts.method = 'get'
      return dispatch('request', opts)
    },

    // POST
    post ({ dispatch }, opts) {
      opts.method = 'post'
      return dispatch('request', opts)
    },

    // PUT
    put ({ dispatch }, opts) {
      opts.method = 'put'
      return dispatch('request', opts)
    },

    // DELETE
    delete ({ dispatch }, opts) {
      opts.method = 'delete'
      return dispatch('request', opts)
    }
  }
})
