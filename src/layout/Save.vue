<template>
  <div v-if="setupIsDifferent" class="notification is-warning">
    Settings updated.

    <a @click="$store.commit('SETUP_REVERT')" class="button pull-right">
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['setupIsDifferent'])
  }
}
</script>

<style scoped>
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
</style>
