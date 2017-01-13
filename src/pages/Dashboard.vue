<template>
  <div class="page padded">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h1>Welcome to Apiko!</h1>
          <div class="columns is-mobile">
            <div class="column">
              <h3>Workflow</h3>
              <ol>
                <li>Create a collection (database table) for your data. Name it e.g. 'posts' and give it some properties.</li>
                <li>Once you are happy with the collection, click the 'Generate Endpoints' button.</li>
                <li>Save this server's setup using the SAVE button, which appears in the menu bar whenever you change anything.</li>
                <li>Either use the endpoints as they get generated or alter their behavior using a custom handler.</li>
              </ol>
              <router-link class="button is-primary" to="collections">
                <span>GET STARTED</span>
                <span class="icon">
                  <i class="fa fa-chevron-circle-right"></i>
                </span>
              </router-link>
            </div>
            <div class="column">
              <h3>Saving Setup</h3>
              <p>When this UI successfully connects to an Apiko server first time, it downloads the server's setup and create's its copy in the memory. You can then feel free to edit anything around this UI without having the server immediately affected by the changes.</p>
              <p>Once you make some changes, two buttons will appear in the menu bar - SAVE and RESTORE. The SAVE button will push the changes to the server, which will also reload the server. Use the SAVE button whenever you are happy with the changes you've made to the server's setup using this UI. The RESTORE button will discard all changes you have made since you have connected to the server last time and started editing.</p>
              <h5>In Case of Emergency</h5>
              <p>The original setup of the server is held in the memory until you close this UI. If you SAVE a new setup and the server stops working for any reason, you can always RESTORE &amp; SAVE, which will rewrite the changes you have SAVEd. The server's data may still be affected through. Do regular backups and develop on your local machine rather than in production environment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
