<template>
  <div id="app">

    <nav class="nav">
      <div class="nav-left nav-menu">
        <router-link class="nav-item is-tab" active-class="is-active" to="/collections">
          <span class="icon">
            <i class="fa fa-database"></i>
          </span>
          <span>Collections <span v-if="showDocs">(DB Tables)</span></span>
        </router-link>
        <router-link class="nav-item is-tab" active-class="is-active" to="/endpoints">
          <span class="icon">
            <i class="fa fa-map-signs"></i>
          </span>
          <span>Endpoints <span v-if="showDocs">(URLs)</span></span>
        </router-link>
      </div>

      <div class="nav-center">
        <router-link class="nav-item" to="/">
          <img src="../assets/images/inappicon52x25.svg" alt="Apiko">
        </router-link>
      </div>

      <span @click="toggleMenu()" class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu">
        <router-link class="nav-item is-tab" active-class="is-active" to="/reference">
          <span class="icon">
            <i class="fa fa-file-text"></i>
          </span>
          <span><span v-if="showDocs">This API's</span> Reference</span>
        </router-link>
        <router-link class="nav-item is-tab" active-class="is-active" to="/documentation">
          <span class="icon">
            <i class="fa fa-book"></i>
          </span>
          <span>Apiko Docs</span>
        </router-link>
        <a class="nav-item" @click="$store.commit('SHOW_DOCS')" title="Toggle In-place Documentation">
          <span class="icon">
            <i v-if="showDocs" class="fa fa-question-circle"></i>
            <i v-else class="fa fa-question-circle-o"></i>
          </span>
        </a>
      </div>
    </nav>

    <!-- main view -->
    <transition name="fade">
      <router-view></router-view>
    </transition>

    <!-- footer -->
    <footer class="footer">

      <router-link to="/stats" class="stats">
        <span class="icon">
          <i class="fa fa-bar-chart"></i>
        </span>
        318 requests past 30 days
      </router-link>

      <router-link to="/config?update" class="config">
        <span class="icon">
          <i class="fa fa-plug"></i>
        </span>
        Connected to: {{ $store.state.apiUrl }}
      </router-link>

      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Apiko</strong> is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            Source code is available on <a href="https://github.com/apiko-rest-api">Github</a>
          </p>
        </div>
      </div>
    </footer>

    <!-- "save settings" bar -->
    <div v-if="setupIsDifferent" class="notification is-warning">
      Settings updated.

      <a @click="$store.commit('SETUP_RESTORE')" class="button pull-right">
        <span class="icon">
          <i class="fa fa-refresh"></i>
        </span>
        REVERT CHANGES
      </a>
      <a @click="$store.dispatch('setupSave')" class="button is-primary pull-right">
        <span class="icon">
          <i class="fa fa-save"></i>
        </span>
        SAVE
      </a>
    </div>

  </div>
</template>

<script>
import localStorage from 'store'
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      menuActive: false
    }
  },
  computed: {
    ...mapGetters(['setupIsDifferent']),
    ...mapState(['showDocs'])
  },
  methods: {
    toggleMenu () {
      this.menuActive = !this.menuActive
    }
  },
  mounted () {
    // show docs ?
    const showDocs = localStorage.get('showDocs')
    if (showDocs) {
      this.$store.commit('SHOW_DOCS', showDocs)
    }
  }
}
</script>

<style scoped>
nav a span:last-child {
  display: inline-block;
  margin-left: 6px;
}

div.notification {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  height: 55px;
  line-height: 35px;
  margin-bottom: 0;
}
div.notification .button:last-child {
  margin-right: 10px;
}
div.notification .button .icon:first-child:last-child {
  margin-right: .3rem;
}

footer {
  position: relative;
  padding-top: 4rem;
}
footer .stats, footer .config {
  position: absolute;
  top: 10px;
  color: #888;
}
footer .stats:hover, footer .config:hover {
  color: #000;
}
footer .stats {
  left: 10px;
}
footer .config {
  right: 10px;
}
</style>
