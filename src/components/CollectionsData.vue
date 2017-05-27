<template>
  <div class="data-container">
    <div class="infinite-form columns">
      <div class="column is-one-quarter">
        <div class="field">
          <label class='label'>Choose number of inputs</label>
          <p class="control">
            <button @click="inputCountMod('dec')" class="button is-danger">-</button>
            <input class="input" type="number" v-model.number='inputCount' placeholder="Inputs (Enter numbers)">
            <button @click="inputCountMod('inc')" class="button is-info">+</button>
          </p>
        </div>
      </div>
    </div>
    <div v-for='count in inputCount'>
      <label class='label inline-block'> {{ count }}) </label>
      <div v-for='col in getCols()' class='inline-block'>
        <div class="field">
          <label class='label'>{{col['name']}}</label>
          <p class="control">
            <template v-if='col["name"]=="password"'>
              <input :name="col['name']" class="input" type="password" :placeholder="`Enter ${col['name'].toLowerCase()}`">
            </template>
            <template v-else-if='col["type"]=="number"'>
              <input :name="col['name']" class="input" type="number" :placeholder="`Enter ${col['type'].toLowerCase()}`">
            </template>
            <template v-else>
              <input :name="col['name']" class="input" type="text" :placeholder="`Enter ${col['type'].toLowerCase()}`">
            </template>
          </p>
        </div>
      </div>
    </div>
    <div class="field" v-if='inputCount > 0'>
      <button class='button is-primary' type="button" name="button">Submit</button>
    </div>
    <template v-if='collectionStore'>
      <table class='table' v-if='collectionStore.length > 0'>
      <thead>
        <tr>
          <th>S.no</th>
        </tr>
      </thead>
      <tbody>
        <td>1</td>
      </tbody>
    </table>
  </template>
  </div>
</template>

<script>
import api from '../store/api'
import { mapState } from 'vuex'

export default {
  props: ['url'],
  data () {
    return {
      collectionStore: null,
      inputCount: 1,
      formValues: []
    }
  },
  computed: {
    ...mapState(['config']),
    ...mapState(['setup'])
  },
  methods: {
    inputCountMod (param) {
      if (param === 'inc') {
        this.inputCount += 1
      } else if (param === 'dec' && this.inputCount > 0) {
        this.inputCount -= 1
      }
    },
    getCols () {
      this.formValues = []
      let cols = []
      let collectionCols = this.setup.collections[this.url]
      let type, limit
      for (let col in collectionCols) {
        [type, limit] = collectionCols[col]['type'].split(' ')
        cols.push({
          'name': col,
          'type': type,
          'limit': limit
        })
      }
      return cols
    },
    getCollectionData () {
      return api.get(`http://localhost:5000/${this.url}`)
        .then(res => {
          console.log(res.data)
          this.collectionStore = res.data
        })
    },
    postToCollection () {
      return api.post(`http://localhost:5000/${this.url}`, this.postData)
        .then(res => {
          console.log(res.data)
          this.collectionStore = res.data
        })
    }
  },
  created () {
    this.getCollectionData()
  }
}
</script>

<style scoped>
div.field {
  margin: .5rem 0;
}
.control > * {
  display: inline-block;
}
.control input {
  max-width: none;
  width: auto;
}

.inline-block {
  display: inline-block;
  margin: 0 .5rem;
}
</style>
