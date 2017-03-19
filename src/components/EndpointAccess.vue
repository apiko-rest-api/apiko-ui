<template>
  <div class="endpoint-access-wrapper">
    <p class="control">
      <label class="radio">
        <input type="radio" v-model="restrict" value="all" @change="updateEndpointAccess">
        All users
      </label>
    </p>
    <p class="control">
      <label class="radio">
        <input type="radio" v-model="restrict" value="logged-in" @change="updateEndpointAccess">
        Only logged in users
      </label>
    </p>
    <p class="control">
      <label class="radio">
        <input type="radio" v-model="restrict" value="role-based" @change="updateEndpointAccess">
        Role-based
      </label>
    </p>

    <div class="roles-settings" v-show="restrict === 'role-based'">
      <p class="control">
        <span class="caption">Type or choose a role: </span>
        <el-autocomplete
          class="role-autocomplete-input"
          v-model="roleName"
          :fetch-suggestions="rolesSearch"
          placeholder="i.e., admin, moderator, ..."
        ></el-autocomplete>
        <button type="button" class="button is-primary" @click="addRole">
          <span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD TO LIST</span>
        </button>
      </p>

      <p class="control role-tags" v-show="roles.length > 0">
        <span class="caption">Roles list: </span>
        <el-tag
          v-for="role in roles"
          :closable="true"
          @close="removeRole(role)"
        >
          {{ role }}
        </el-tag>
      </p>

      <p class="control">
        Ownership:
        <el-switch
          class="role-switch"
          v-model="ownership"
          on-text="YES"
          off-text="NO"
          on-color="#00d1b2"
          off-color="#999"
          @change="updateEndpointAccess"
        >
        </el-switch>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

export default {
  props: ['path'],
  created () {
    this.getEndpointAccess()
  },
  watch: {
    path () {
      this.getEndpointAccess()
    }
  },
  data () {
    return {
      roleName: '',
      restrict: 'all',
      ownership: true,
      roles: []
    }
  },
  computed: {
    ...mapGetters([
      'rolesList'
    ])
  },
  methods: {
    getEndpointAccess () {
      const endpoint = this.$store.getters.endpoint(this.path)

      this.restrict = 'all'
      this.ownership = true
      this.roles = []

      if (endpoint) {
        if (endpoint.restrict && Array.isArray(endpoint.restrict)) {
          this.restrict = 'role-based'
          this.roles = JSON.parse(JSON.stringify(endpoint.restrict))
          this.ownership = endpoint.hasOwnProperty('ownership')
        }

        if (endpoint.restrict === true) {
          this.restrict = 'logged-in'
        }
      }
    },
    updateEndpointAccess () {
      this.$store.commit('UPDATE_ENDPOINT_ACCESS', {
        path: this.path,
        restrict: this.restrict,
        roles: this.roles,
        ownership: this.ownership
      })
      this.$parent.$forceUpdate()
      this.$emit('save')
    },
    removeRole (role) {
      this.roles.splice(this.roles.indexOf(role), 1)
      this.updateEndpointAccess()
    },
    rolesSearch (queryString, cb) {
      let results = queryString
        ? this.rolesList.filter((role) => role.indexOf(queryString) === 0)
        : this.rolesList
      results = results.map((role) => ({ value: role }))
      cb(results)
    },
    addRole () {
      if (this.roleName) {
        if (this.roles.indexOf(this.roleName) === -1) {
          this.roles.push(this.roleName)
          this.updateEndpointAccess()
        }
        this.roleName = ''
      }
    }
  }
}
</script>

<style lang="scss">
  .endpoint-access-wrapper {
    .role-autocomplete-input {
      margin-left: 5px;

      .el-input {
        height: 2.285em;
      }

      input.el-input__inner {
        border: 1px solid #dbdbdb;
        box-shadow: none;
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
        color: #363636;
        height: 2.285em;
      }
    }

    .role-tags {
      span.caption {
        line-height: 32px;
      }

      .el-tag {
        background-color: #fff;
        color: #000;
        border-color: #dbdbdb;
        padding: 4px 8px 2px 8px;
        height: 32px;
        font-size: 14px;
        margin-left: 5px;
      }
    }

    .roles-settings {
      padding-left: 32px;
    }

    .role-switch {
      margin-left: 5px;
    }
  }
</style> 
