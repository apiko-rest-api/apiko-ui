<template>
  <div v-if="show" id="loading">
    <img src="../assets/ripple.svg" alt="Loading...">
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    window.model.loading = this
  }
}
</script>

<style scoped>
#loading {
  background-color: rgba(255, 255, 255, .7);
  width: 100vw;
  height: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

#loading img {
  width: 120px;
  height: 120px;
  padding: 0;

  position: absolute;
  top: 50%;
  left: 50%;

  margin: -180px 0 0 -60px;
}
</style>
