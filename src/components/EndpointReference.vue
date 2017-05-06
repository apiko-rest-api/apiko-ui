<template>
  <div class="endpoint-doc-container">
    <div class="field">
      <label class="label">Description</label>
      <p class="control">
        <textarea class="textarea" placeholder="Describe the functionality of this endpoint" v-model='documentEndpoint.comment'></textarea>
      </p>
    </div>

    <h2 v-if='documentEndpoint.params'>Describe Params</h2>

    <div class="card" v-for='(params, key) in documentEndpoint.params'>

      <div class="card-header">
        <h3 class="card-header-title">{{ key }}</h3>
      </div>

      <div class="card-content">
        <div class="content">
          <div class="field" >
            <label class="label">Comment</label>
            <p class="control">
              <input class="input" placeholder="describe this param" v-model='params.comment'>
            </p>
          </div>

          <div class="field" >
            <label class="label">Regex</label>
            <p class="control">
              <input class="input" placeholder="A regex for this param" :value="params.regex">
            </p>
          </div>

          <div class="field">
            <label class='label'>Required</label>
            <p class="control">
              <label class="radio">
                <input type="radio" value="true" :name="key" v-model='params.required'>
                Yes
              </label>
              <label class="radio">
                <input type="radio" value="false" :name="key" v-model='params.required'>
                No
              </label>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label class='label'>Restrict</label>
      <p class="control">
        <label class="radio">
          <input type="radio" name="restrict" value="true" v-model="documentEndpoint.restrict">
          Yes
        </label>
        <label class="radio">
          <input type="radio" name="restrict" value="false" v-model="documentEndpoint.restrict">
          No
        </label>
      </p>
    </div>
    <div class="field">
      <label class='label'>Ownership</label>
      <p class="control">
        <label class="radio">
          <input type="radio" name="ownership" value="true" v-model='documentEndpoint.ownership'>
          Yes
        </label>
        <label class="radio">
          <input type="radio" name="ownership" value="false" v-model='documentEndpoint.ownership'>
          No
        </label>
      </p>
    </div>

    <h2 v-if='documentEndpoint.response && Object.keys(documentEndpoint.response).length'>Response</h2>
    <div class="card response-doc-container" v-for='(response, key) in documentEndpoint.response'>

      <div class="card-header">
        <h3 class="card-header-title">{{ key }}</h3>
      </div>

      <div class="card-content">
        <div class="content">
          <div class="field" >
            <label class="label">Comment</label>
            <p class="control">
              <input class="input" placeholder="Textarea" v-model='response.comment'>
            </p>
          </div>

          <div class="field">
            <label class="label">Type</label>
            <p class="control">
              <span class="select">
                <select v-model='response.type'>
                  <option>string</option>
                  <option>bool (1|0)</option>
                  <option>number</option>
                </select>
              </span>
            </p>
          </div>

          <div class="field">
            <label class='label'>Present</label>
            <p class="control">
              {{ response.present }}
              <label class="radio">
                <input type="radio" name="present" value="always" v-model='response.present'>
                Always
              </label>
              <label class="radio">
                <input type="radio" name="present" value="false" v-model='response.present'>
                No
              </label>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="field inline">
      <p class='control'>
        <button class='button is-primary' @click='saveDocs'>Save Changes</button>
      </p>
      <p class="control">
        <button class="button is-link" @click='setForm'>Reset Changes</button>
      </p>
    </div>
  </div>
</template>

<script>
const cloneDeep = require('lodash.clonedeep')
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: ['path'],
  computed: {
    ...mapState(['setup']),
    ...mapGetters(['endpoint']),
    currentEndpoint () {
      return this.endpoint(this.path)
    }
  },
  methods: {
    ...mapMutations(['UPDATE_ENDPOINT']),
    ...mapActions(['setupSave']),
    setForm () {
      this.documentEndpoint = cloneDeep(this.currentEndpoint)
    },
    saveDocs () {
      this.UPDATE_ENDPOINT({
        path: this.path, endpoint: this.documentEndpoint
      })
    }
  },
  watch: {
    currentEndpoint () {
      this.setForm()
    }
  },
  created () {
    this.setForm()
  },
  data () {
    return {
      documentEndpoint: null
    }
  }
}
</script>

<style scoped>
  .card {
    margin: 1rem 0;
  }
  .inline > * {
    display: inline-block;
  }
  .field.inline {
    margin: 1rem 0;
  }
  button {
    text-transform: uppercase;
    font-size: .9rem;
  }
</style>
