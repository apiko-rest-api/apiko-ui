<template>
  <div id="app">
    <Loading></Loading>

    <div class="card text-muted" v-if="displayMenu">
      <div class="card-content" style="padding: 4px 10px 4px 10px;">
        <span class="icon is-small" style="position: relative; top: 4px;"><i class="fa fa-bar-chart"></i></span> <span>318 requests past 30 days</span>
        <span class="is-pulled-right"><span class="icon is-small" style="position: relative; top: 4px;"><i class="fa fa-plug"></i></span> Connected to: <span>{{base}}</span></span>
      </div>
    </div>

    <nav class="nav has-shadow" v-if="displayMenu">
      <router-link class="nav-item" to="/dashboard">
        <img src="./assets/inappicon52x25.svg" alt="Apiko">
      </router-link>

      <div class="nav-left nav-menu">
        <router-link class="nav-item is-tab" active-class="is-active" to="/collections">
          <span class="icon">
            <i class="fa fa-database"></i>
          </span>
          <span>Collections <span v-if="displayDocs">(DB Tables)</span></span>
        </router-link>
        <router-link class="nav-item is-tab" active-class="is-active" to="/endpoints">
          <span class="icon">
            <i class="fa fa-map-signs"></i>
          </span>
          <span>Endpoints <span v-if="displayDocs">(URLs)</span></span>
        </router-link>
      </div>

      <div v-if="setupsDifferent" class="nav-center">
        <a @click="setupRestore()" class="nav-item button is-small" style="margin-right: 12px;">
          <span class="icon">
            <i class="fa fa-refresh"></i>
          </span>
          <span v-if="displayDocs">RESTORE</span>
        </a>
        <a @click="setupSave()" class="nav-item button is-primary is-small">
          <span class="icon">
            <i class="fa fa-save"></i>
          </span>
          <span v-if="displayDocs">SAVE</span>
        </a>
      </div>

      <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
      <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
      <span @click="toggleMenu()" class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div class="nav-right nav-menu">
        <router-link class="nav-item is-tab" active-class="is-active" to="/reference">
          <span class="icon">
            <i class="fa fa-file-text"></i>
          </span>
          <span><span v-if="displayDocs">This API's</span> Reference</span>
        </router-link>
        <router-link class="nav-item is-tab" active-class="is-active" to="/documentation">
          <span class="icon">
            <i class="fa fa-book"></i>
          </span>
          <span>Apiko Docs</span>
        </router-link>
        <a class="nav-item" @click="toggleDocs" title="Toggle In-place Documentation">
          <span class="icon">
            <i v-if="displayDocs" class="fa fa-question-circle"></i>
            <i v-else class="fa fa-question-circle-o"></i>
          </span>
        </a>
      </div>
    </nav>

    <transition name="fade">
      <router-view :docs="displayDocs" @setup-change="setupChanged()"></router-view>
    </transition>
  </div>
</template>

<script>
import Loading from './components/Loading'

export default {
  components: {
    Loading
  },
  data () {
    return {
      menuActive: false,
      displayDocs: true
    }
  },
  computed: {
    displayMenu () {
      return this.$route.meta.menu
    },
    base () {
      return window.helpers.storedValue('base')
    },
    setupsDifferent () {
      if (JSON.stringify(this.$store.state.setup) !== JSON.stringify(this.$store.state.originalSetup)) {
        return true
      }

      return false
    }
  },
  methods: {
    toggleMenu () {
      return !this.menuActive
    },
    toggleDocs () {
      this.displayDocs = !this.displayDocs

      if (this.displayDocs) {
        window.localStorage.removeItem('hide-docs')
      } else {
        window.localStorage.setItem('hide-docs', 'true')
      }
    },
    setupSave () {
      console.log('Saving the setup...')

      var params = {
        setup: this.$store.state.setup
      }

      if (window.helpers.storedValue('secret', false)) {
        params.secret = window.helpers.storedValue('secret')
      }

      this.$store.dispatch('put', {
        path: '/apiko/setup',
        args: params
      })
    },
    setupRestore () {
      console.log('Restoring the setup...')

      if (window.helpers.different()) {
        this.$store.state.setup = JSON.parse(JSON.stringify(this.$store.state.originalSetup)) // a dirty hack to duplicate object
      }
    }
  },
  mounted () {
    if (window.helpers.storedValue('hide-docs', false)) {
      this.displayDocs = false
    }
  }
}
</script>

<style>
html, 
body {
  display: block;
  min-height: 100vh;
}

body {
  background-color: #eeeeee;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.page {
  padding-bottom: 50px;
}

.page.padded {
  padding: 20px;
}

.page.centered {
  padding: 20px;
}

/* menu */

nav a span:last-child {
  display: inline-block;
  margin-left: 6px;
}

/* content */

.text-muted {
  color: #bbbbbb;
}

@media screen and (min-width: 800px) {
  .page.centered {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}

@media screen and (min-width: 1200px) {
  .page.centered {
    width: 35%;
  }
}

@media print {
  .no-print {
    display: none;
  }
}
</style>

