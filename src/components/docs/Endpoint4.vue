<template>
  <div style="margin-top: 20px;">

    <h4>Defined vs Undefined</h4>
    <p>
      You can either define an endpoint here in the UI or define it in the code. Either way, you will have to create a coded handler function. The difference is in the parameters validation and documenting.
    </p>
    <p>
      If you want to use the API Reference feature of Apiko, which automates the API documentation where possible, the endpoint has to be defined over this UI.
    </p>

    <h4>Validation</h4>
    <p>
      Handler functions for endpoints defined here in the UI receive already validated parameters in the <code>request.params</code> variable, while handlers for endpoints undefined here in the UI rececive the parameter values as received.
    </p>
    <p>
      See the server's /main.js for a few quick examples.
    </p>

    <pre><code>
  Apiko.on('GET /collection/action', (request, store) => {
  // request.method contains the HTTP method received, uppercased, 'GET' in this case

  // Now two cases can happen here:

  // CASE 1: you have not defined the specified (URL) endpoint in Apiko GUI

  // Request parameters are stored in the request.params property and are
  // never validated. You have to validate them here.

  if (request.params.foo) {
  // In order to respond to the client, you need to call:
  request.respondSuccess({any: 'data'}) // 200 OK
  } else {
  // If you are not happy, you can respond with an error:
  request.respondError(400, 'Custom message', 76)
  // args: HTTP status code, custom message, custom error code, all optional
  // custom error codes should be > 100
  }

  // CASE 2: the specified (URL) endpoint is defined in Apiko GUI

  // The params will be processed according to your Apiko GUI validation
  // setup and this callback will never be called if they are invalid.

  // Furthermore, if the specified endpoint is a special endpoint processed
  // by Apiko itself (e.g. a user login at /users/login), the request.response
  // property will be present and will contain an object describing how would
  // Apiko normally respond to this request, for example:
  //
  // Error: { status: 401, message: 'The username parameter is missing.', code: 1 }
  // Success: { status: 200, data: { session: 's43v094ioag345...' }}

  // You always have to call request.respondSuccess() or request.respondError() in
  // this handler to make the web server respond!
  })
    </code></pre>

  </div>
</template>
