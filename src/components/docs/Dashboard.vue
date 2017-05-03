<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-mobile">
          <div class="column">

            <h2>Basic concepts</h2>
            <p>
              Apiko is an API framework and toolbox that helps you get an API up and running in minutes.
            </p>

            <h4>Collections</h4>
            <p>
              Collections are a representation of your database tables. You can add/remove properties directly in the "Collections tab".
              <br />
              <em>Beware that editing collections change your database's schema.</em>
            </p>
            <p>
              Read more about collections in <a href="#/documentation">Apiko documentation</a>.
            </p>

            <h4>Endpoints</h4>
            <p>
              Endpoints are the URL exposed by your API. Some are generated automatically according to the collection's structure, and you can add endpoints with a custom handler code. Learn more about custom endpoints in the documentation.
            </p>
            <p>
              Read more about endpoints in <a href="#/documentation">Apiko documentation</a>.
            </p>

          </div>
          <div class="column">

            <h2>Get started</h2>
            <ol>
              <li>
                Prepare your data structure.
              </li>
              <li>
                Create collections accordingly in the <em>Collections</em> menu tab.
              </li>
              <li>
                Check that all necessary endpoint have been generated, or create them, in the <em>Endpoints</em> menu tab.
              </li>
              <li>
                Save your configuration using the SAVE button, which appears at the bottom of your screen whenever you change anything.
              </li>
              <li>
                API is ready !
              </li>
            </ol>

            <router-link class="button is-primary" to="collections">
              <span>GET STARTED</span>
              <span class="icon">
                <i class="fa fa-chevron-circle-right"></i>
              </span>
            </router-link>

          </div>
          <div class="column">

            <h2>API configuration</h2>
            <p>
              If a yellow bar appears at the bottom of your screen saying "Settings updated.", it means that the configuration that you see here differs from the configuration of your API.
            </p>
            <p>
              When pressing the <strong>SAVE</strong> button, the configuration is saved in the API and the bar should disappear.
            </p>

            <h4>In Case of Emergency</h4>
            <p>
              The original configuration is held in the memory until you close this UI. If you <strong>SAVE</strong> and the server crashes, you can always <strong>REVERT</strong> and <strong>SAVE</strong> over, which should restore the server to its original setup.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
