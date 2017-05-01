<template>
  <div class="route-cards">
    <div class="card" v-for='(route, key, i) in routes'>
      <div class="card-header">
        <div class="card-header-title">
          /{{ key }}
        </div>
        <a class="card-header-icon" @click='toggle(i)'>
          <span class="icon">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>
      </div>
      <div class="card-content" v-show='showCard[i]'>
        <div class="content">
          <table class='table is-narrow'>
            <tbody>
              <tr v-for='(child, childKey) in route.children'>
                <td>
                  <div>
                    <strong v-if='childKey !== "/"'>{{ childKey }}</strong>
                    <strong v-else>root <span class="path-root">(/{{ key }})</span></strong>
                  </div>
                  <ul>
                    <li v-if='childKey !== "/"'>
                      <router-link active-class="is-active" :to="link(`${method} /${key}${childKey}`)" tag='span' class='tag' :class='classForMethod(method)' v-for='method in child' exact>
                        {{ method }}&nbsp;
                        <i v-if="isCoreEndpoint(`${method} /${key}${childKey}`) === 'core'" class="fa fa-dot-circle-o" title="This is an Apiko core endpoint."></i>
                        <i v-if="isCoreEndpoint(`${method} /${key}${childKey}`) === 'overridden'" class="fa fa-wrench" title="This is an overriden core endpoint."></i>
                        <i v-if="isCoreEndpoint(`${method} /${key}${childKey}`) === 'custom'" class="fa fa-puzzle-piece" title="This is a custom endpoint."></i>
                      </router-link>
                    </li>
                    <li v-else>
                      <router-link active-class="is-active" :to="link(`${method} /${key}`)" tag='span' class='tag' :class='classForMethod(method)' v-for='method in child' exact>
                        {{ method }}&nbsp;
                        <i v-if="isCoreEndpoint(`${method} /${key}${childKey}`) === 'core'" class="fa fa-dot-circle-o" title="This is an Apiko core endpoint."></i>
                        <i v-if="isCoreEndpoint(`${method} /${key}${childKey}`) === 'overridden'" class="fa fa-wrench" title="This is an overriden core endpoint."></i>
                        <i v-if="isCoreEndpoint(`${method} /${key}${childKey}`) === 'custom'" class="fa fa-puzzle-piece" title="This is a custom endpoint."></i>
                      </router-link>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['routes'],
  data () {
    return {
      showCard: Object.keys(this.routes).map((e, i) => {
        if (i === 0) return true
        return false
      })
    }
  },
  computed: {
    ...mapGetters(['isCoreEndpoint'])
  },
  methods: {
    classForMethod (method) {
      switch (method) {
        case 'GET': return { 'is-success': true }
        case 'POST': return { 'is-info': true }
        case 'PUT': return { 'is-warning': true }
        case 'DELETE': return { 'is-danger': true }
        case 'PATCH': return { 'is-primary': true }
        case 'OPTIONS': return { 'is-white': true }
        default: return { 'is-black': true }
      }
    },
    link (path) {
      return {
        name: this.$route.name === 'endpoint-reference' ? 'endpoint-reference' : 'endpoint',
        params: {
          path
        }
      }
    },
    toggle (i) {
      this.showCard.splice(i, 1, !this.showCard[i])
    }
  }
}
</script>

<style scoped>
.content ul {
  list-style-type: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

.content ul li {
  display: inline-block;
}

.content ul li span {
  min-width: 50px;
  margin: 2px;
}

.route {
  font-weight: bold;
  min-width: 165px;
  background: #eaeaea;
  padding: .2px 5px;
  border-radius: 2px;
  margin: 0 5px;
}

.mini.tag {
  min-width: auto;
  border-radius: 2px;
  height: auto;
  padding: 0 5px;
}

.path-root {
  color: #bbbbbb;
}
</style>
