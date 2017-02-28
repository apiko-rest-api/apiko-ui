<template>
  <div class="page padded">
    <div class="content">
      <h1 style="text-align: center;">Welcome to Apiko!</h1>
    </div>

    <doc name="dashboard"></doc>

    <div class="card">
      <div class="card-content">
        <div class="content" style="text-align: center">
          <router-link class="button is-big is-primary" active-class="is-active" to="/collections">
            <span class="icon">
              <i class="fa fa-database"></i>
            </span>
            <span>CREATE A COLLECTION</span>
          </router-link>
          <router-link class="button is-big is-primary" active-class="is-active" to="/endpoints">
            <span class="icon">
              <i class="fa fa-map-signs"></i>
            </span>
            <span>CREATE AN ENDPOINT</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
