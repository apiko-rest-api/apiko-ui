<template>
  <div id="app">
    <Loading></Loading>

    <div class="card" v-if="displayMenu" style="color: #bbbbbb">
      <div class="card-content" style="padding: 4px 10px 4px 10px;">
        <span class="icon is-small" style="position: relative; top: 4px;"><i class="fa fa-bar-chart"></i></span> <span>11036 requests past 30 days</span>
        <span class="is-pulled-right"><span class="icon is-small" style="position: relative; top: 4px;"><i class="fa fa-plug"></i></span> Connected to: <span>{{base}}</span></span>
      </div>
    </div>

    <nav class="nav has-shadow" v-if="displayMenu">
      <router-link class="nav-item" to="dashboard">
        <img src="./assets/inappicon52x25.svg" alt="Apiko">
      </router-link>

      <div class="nav-left nav-menu">
        <router-link class="nav-item is-tab" active-class="is-active" to="/collections">
          <span class="icon">
            <i class="fa fa-database"></i>
          </span>
          <span>Collections (DB Tables)</span>
        </router-link>
        <router-link class="nav-item is-tab" active-class="is-active" to="/endpoints">
          <span class="icon">
            <i class="fa fa-map-signs"></i>
          </span>
          <span>Endpoints (URLs)</span>
        </router-link>
      </div>

      <div v-if="setupsDifferent" class="nav-center">
        <a class="nav-item button is-primary">
          <span class="icon">
            <i class="fa fa-save"></i>
          </span>
          <span>SAVE</span>
        </a>
        <a class="nav-item button is-danger">
          <span class="icon">
            <i class="fa fa-refresh"></i>
          </span>
          <span>RESTORE</span>
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
          <span>This API's Reference</span>
        </router-link>
        <router-link class="nav-item is-tab" active-class="is-active" to="/documentation">
          <span class="icon">
            <i class="fa fa-book"></i>
          </span>
          <span>Apiko Docs</span>
        </router-link>
      </div>
    </nav>

    <transition name="fade">
      <router-view></router-view>
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
      menuActive: false
    }
  },
  computed: {
    displayMenu () {
      return this.$route.meta.menu
    },
    base () {
      return window.model.storedValue('base')
    },
    setupsDifferent () {
      return !window.model.different()
    }
  },
  methods: {
    toggleMenu () {
      return !this.menuActive
    }
  },
  mounted () {
  }
}
</script>

<style>
html, 
body {
    height: 100%;
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
  /* margin-top: 54px; */
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

.content {
  background-color: #ffffff;
  padding: 10px;
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
</style>

