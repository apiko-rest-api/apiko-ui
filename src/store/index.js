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
    request (context, opts) {
      var config = {}

      if (!opts.args) {
        opts.args = {}
      }

      console.log(opts.method.toUpperCase(), opts.path, 'Params:', opts.args)

      if (opts.loading !== false) {
        context.commit('toggleLoading', true)
      }

      var p = window.axios[opts.method](opts.path, opts.args, config)

      p.then((response) => {
        console.log('HTTP OK:', response)

        if (opts.loading !== false) {
          context.commit('toggleLoading', false)
        }
      })

      p.catch((error) => {
        console.warn('HTTP ERR:', error)

        if (opts.loading !== false) {
          context.commit('toggleLoading', false)
        }
      })

      return p
    },

    // AJAX GET
    get (context, opts) { // path, loading, args
      opts.method = 'get'
      return context.dispatch('request', opts)
    },

    // AJAX POST
    post (context, opts) { // path, loading, args
      opts.method = 'post'
      return context.dispatch('request', opts)
    },

    // AJAX PUT
    put (context, opts) { // path, loading, args
      opts.method = 'put'
      return context.dispatch('request', opts)
    },

    // AJAX DELETE
    delete (context, opts) { // path, loading, args
      opts.method = 'delete'
      return context.dispatch('request', opts)
    }
  }
})
