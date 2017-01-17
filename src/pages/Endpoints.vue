<template>
  <div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter"><EndpointsList></EndpointsList></div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>Endpoints</h1>
              <p v-if="docs">Endpoints are simply URLs which can be used to retrieve or change data stored on the server. Each endpoint consists of URL parameters and a handler (function) that receives these parameters validated (according to each endpoint's validation setup) and responds to the client. The quickest way to get the hang of endpoints is to:</p>
              <ol v-if="docs">
                <li>Create an endpoint using the form below. E.g. <code>GET /posts</code></li>
                <li>Setup some parameters and their validation.</li>
                <li>SAVE the setup and head to the /main.js file of this server for straight examples of coding handlers.</li>
              </ol>
              <h3>Create an Endpoint</h3>
              <p class="control has-addons">
                <span class="select">
                  <select v-model="editMethod">
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                    <option>CHECKOUT</option>
                    <option>COPY</option>
                    <option>HEAD</option>
                    <option>LOCK</option>
                    <option>MERGE</option>
                    <option>MKACTIVITY</option>
                    <option>MKCOL</option>
                    <option>MOVE</option>
                    <option>M-SEARCH</option>
                    <option>NOTIFY</option>
                    <option>OPTIONS</option>
                    <option>PATCH</option>
                    <option>PURGE</option>
                    <option>REPORT</option>
                    <option>SEARCH</option>
                    <option>SUBSCRIBE</option>
                    <option>TRACE</option>
                    <option>UNLOCK</option>
                    <option>UNSUBSCRIBE</option>
                  </select>
                </span>
                <input v-model="editPath" class="input" size="36" type="text" placeholder="E.g.: /example or /example/action">
                <router-link class="button is-primary" :to="editUrl"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD</span></router-link>
              </p>
              <h4 v-if="docs">ID Parameters</h4>
              <p v-if="docs">Endpoint address may contain ID parameters in the format of <code>:name</code>, for example <code>/posts/:post/comments/:comment</code> will match a request such as <code>/posts/about-us/comment/46</code>. The parameters are named accordingly and can be accessed with <code>request.params</code> inside an endpoint handler function, e.g. <code>request.params.comment // == 46</code>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EndpointsList from '../components/EndpointsList'

export default {
  props: ['docs'],
  components: {
    EndpointsList
  },
  data () {
    return {
      editMethod: 'GET',
      editPath: ''
    }
  },
  computed: {
    editUrl () {
      return '/endpoints/' + encodeURIComponent(this.editMethod + ' ' + this.editPath)
    }
  }
}
</script>

<style scoped>
</style>
