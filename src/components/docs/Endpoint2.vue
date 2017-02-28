<template>
  <div>

    <h5>Example</h5>
    <p>
      Imagine the following data in the users collection
    </p>

    <table class="table is-striped">
      <thead>
        <tr><th>id</th><th>...</th><th>roles</th></tr>
      </thead>
      <tbody>
        <tr><td><code>1</code></td><td>...</td><td><code>editor,moderator,storemanager,admin</code></td></tr>
        <tr><td><code>2</code></td><td>...</td><td><code>editor,storemanager</code></td></tr>
        <tr><td><code>3</code></td><td>...</td><td><code>editor,moderator</code></td></tr>
        <tr><td><code>4</code></td><td>...</td><td><span class="text-muted">(empty)</span></td></tr>
      </tbody>
    </table>

    <p>
      If you would restrict this endpoint by <code>admin,moderator</code>, only users <strong>1 and 3</strong> could use this endpoint, others would get the <em>403: Forbidden</em> HTTP error.
    </p>

    <h5>Catpcha</h5>
    <p>
      Endpoints can also be protected by a captcha by switching the <strong>NO CAPTCHA</strong> button. In case of captcha protection, answer to the catpcha image must be supplied in the captcha parameter with each call to this endpoint. A captcha image can be retrieved before calling this endpoint from <code>GET /captcha</code>.
    </p>

  </div>
</template>
