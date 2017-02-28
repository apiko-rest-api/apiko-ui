<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-mobile">
          <div class="column">

            <h3>How Does it Work</h3>
            <p>
              Each Apiko REST API consists of some data and a way to work with them. The data are stored in collections (database tables) and can be accessed and edited using URL endpoints. Some endpoints are generated automatically according to the colletions' structure (and can be modified), other endpoints can be created manually (with a custom handler code).
            </p>

          </div>
          <div class="column">

            <h3>Workflow</h3>
            <ol>
              <li>Imagine what data you will need to store.</li>
              <li>Create any number of collections (database tables) accordingly in the <em>Collections</em> menu tab.</li>
              <li>Then head to the <em>Endpoints</em> menu tab where some endpoints are already pre-generated and others can be added.</li>
              <li>Save the whole collections and endpoints setup using the SAVE button, which appears in the menu bar whenever you change anything.</li>
              <li>Use the API.</li>
            </ol>

            <router-link class="button is-primary" to="collections">
              <span>GET STARTED</span>
              <span class="icon">
                <i class="fa fa-chevron-circle-right"></i>
              </span>
            </router-link>

          </div>
          <div class="column">

            <h3>Saving Server's Setup</h3>
            <p>
              This UI has successfully connected to an Apiko server and has downloaded its setup. Now you can change the setup by editing collections and endpoitns and <strong>SAVE</strong> and <strong>RESTORE</strong> buttons will appear in the menu bar once you do so. <strong>SAVE</strong> uploades the new setup back and reloads the server. <strong>RESTORE</strong> reverts the changes back.
            </p>

            <h4>In Case of Emergency</h4>
            <p>
              The original setup of the server is held in the memory until you close this UI. If you <strong>SAVE</strong> and the server gets screwed, you can always <strong>RESTORE</strong> &amp; <strong>SAVE</strong> over, which will hopefully restore the server to its original setup.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
