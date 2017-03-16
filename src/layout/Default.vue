<template>
  <div id="app" class="layout-page">

    <nav class="nav">
      <div class="nav-left nav-menu">
        <router-link class="nav-item is-tab" active-class="is-active" to="/collections">
          <span class="icon">
            <i class="fa fa-database"></i>
          </span>
          <span class="link-label">Collections</span>
        </router-link>
        <router-link class="nav-item is-tab" active-class="is-active" to="/endpoints">
          <span class="icon">
            <i class="fa fa-map-signs"></i>
          </span>
          <span class="link-label">Endpoints</span>
        </router-link>
      </div>

      <div class="nav-center">
        <router-link class="nav-item" to="/">
          <img src="../assets/images/inappicon52x25.svg" alt="Apiko">
        </router-link>
      </div>

      <div class="nav-right nav-menu">
        <router-link class="nav-item is-tab" active-class="is-active" to="/documentation">
          <span class="icon">
            <i class="fa fa-book"></i>
          </span>
          <span class="link-label">Documentation</span>
        </router-link>
        <a class="nav-item is-tab" @click="$store.commit('SHOW_DOCS')" title="Toggle In-place Documentation">
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
    <layout-footer></layout-footer>

    <!-- "save settings" bar -->
    <layout-save></layout-save>

  </div>
</template>

<script>
import { mapState } from 'vuex'

import LayoutFooter from './Footer'
import LayoutSave from './Save'

export default {
  components: {
    LayoutFooter,
    LayoutSave
  },
  computed: {
    ...mapState(['showDocs'])
  }
}
</script>

<style scoped>
nav a span:last-child {
  display: inline-block;
  margin-left: 6px;
}


/**
 * 1. Stick footer to bottom.
 */

.layout-page {
  display: flex; /* [1] */
  flex-direction: column; /* [1] */
  min-height: 100vh; /* [1] */
}


@media screen and (max-width: 550px) {
  .nav-menu a span.link-label {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .nav-menu {
    position: absolute;
    top: 14px;
    background: transparent;
  }
  .nav-left {
    left: 0;
  }
  .nav-right {
    right: 0;
  }
}
</style>
