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

    <div id='data-form'>
      <div v-for='count in inputCount'>
        <label class='label inline-block'> {{ count }}) </label>
        <div v-for='col in getCols()' class='inline-block'>
          <div class="field">
            <label class='label'>{{col['name']}}</label>
            <p class="control">
              <template v-if='col["name"]=="password"'>
                <input :name="col['name']" class="input" type="password" :placeholder="`Enter ${col['name'].toLowerCase()}`">
              </template>
              <template v-else-if='col["type"].toLowerCase() == "integer"'>
                <input :name="col['name']" class="input" type="number" :placeholder="`Enter ${col['type'].toLowerCase()}`">
              </template>
              <template v-else>
                <input :name="col['name']" class="input" type="text" :placeholder="`Enter ${col['type'].toLowerCase()}`">
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>


    <div class="field" v-if='inputCount > 0'>
      <button class='button is-primary' type="button" name="button" @click='requestCreate'>Submit</button>
    </div>
    <hr>
    <template v-if='collectionStore && collectionStore.length > 0'>
      <button class="button is-danger" @click='deleteSelected'>Delete selected rows</button>
      <button class="button is-warning" @click='enableEdits'>Edit selected rows</button>
      <button class="button is-info" @click='editSelected'>Submit edits</button>
      <table class='table' v-if='collectionStore.length > 0'>
      <thead>
        <tr>
          <th><input type="checkbox" v-model='selectAll'>&emsp;Select</th>
          <th v-for='prop in Object.keys(collectionStore[0])'>
            <template v-if='hiddenProps.indexOf(prop) === -1'>
              {{ prop }}
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='collection in collectionStore'>
          <td><input type="checkbox" @click='selectionTrack' v-model="collection['selected']"></td>
          <td v-for='prop in Object.keys(collection)'>
            <template v-if='hiddenProps.indexOf(prop) === -1'>
              <template v-if="collection['isEditable']">
                <input class="input" type="text" v-model="collection[prop]">
              </template>
              <template v-else>
                {{ collection[prop] }}
              </template>
            </template>
          </td>
        </tr>
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
      formValues: [],
      hiddenProps: ['createdAt', 'owner', 'updatedAt', 'isEditable', 'selected'],
      selectAll: false
    }
  },
  computed: {
    ...mapState(['config']),
    ...mapState(['setup'])
  },
  watch: {
    collectionStore () {
      if (!this.collectionStore) this.getCollectionData()
    },
    selectAll (n, o) {
      if (n !== null && n !== undefined) {
        this.collectionStore.forEach(e => {
          e['selected'] = n
        })
      }
    },
    '$route' () {
      this.collectionStore = null
    }
  },
  methods: {
    inputCountMod (param) {
      if (param === 'inc') {
        this.inputCount += 1
      } else if (param === 'dec' && this.inputCount > 0) {
        this.inputCount -= 1
      }
    },
    enableEdits () {
      this.collectionStore.forEach(e => {
        e['isEditable'] = e['selected']
      })
    },
    editSelected () {
      this.collectionStore.forEach(e => {
        if (e['selected']) {
          ((id, data) => {
            setTimeout(() => {
              this.editData(id, data).then(res => {
                data['selected'] = false
                this.selectAll = false
                this.getCollectionData()
              })
            }, 0)
          })(e['id'], e)
        }
      })
    },
    deleteSelected () {
      this.collectionStore.forEach(e => {
        if (e['selected']) {
          (id => {
            setTimeout(() => {
              this.deleteData(id).then(res => {
                this.getCollectionData()
              })
            }, 0)
          })(e['id'])
        }
      })
    },
    selectionTrack () {
      let len = this.collectionStore.length
      let truthy = this.collectionStore.filter(e => e['selected'] === true).length
      if (len === truthy) this.selectAll = true
    },
    addUIProperties (data) {
      return data.map(e => {
        e['isEditable'] = false
        e['selected'] = false
        return e
      })
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
          this.collectionStore = this.addUIProperties(res.data)
        }).catch(err => {
          console.log(err)
          this.collectionStore = []
        })
    },
    editData (id, data) {
      return api.put(`http://localhost:5000/${this.url}/${id}`, data)
        .then(res => {
          console.log(res.data)
        })
    },
    deleteData (id) {
      return api.delete(`http://localhost:5000/${this.url}/${id}`)
        .then(res => {
          console.log(res.data)
          // this.collectionStore = this.addUIProperties(res.data)
        })
    },
    postToCollection (data) {
      return api.post(`http://localhost:5000/${this.url}`, data)
        .then(res => {
          console.log(res)
        })
    },
    requestCreate () {
      let inputs = document.querySelectorAll('#data-form input')
      let reqData = {}
      let reqHolder = []
      for (let i = 0; i <= inputs.length; i++) {
        if (Object.keys(reqData).length === 3) {
          reqHolder.push(reqData)
          reqData = {}
          if (inputs[i]) {
            reqData[inputs[i].name] = inputs[i].value || ''
          }
        } else {
          reqData[inputs[i].name] = inputs[i].value || ''
        }
      }
      this.addToDatabase(reqHolder)
    },
    addToDatabase (reqArr) {
      let self = this
      let promiseArr = []
      for (let req of reqArr) {
        promiseArr.push(self.postToCollection(req))
      }
      Promise.all(promiseArr).then(res => {
        setTimeout(() => {
          this.getCollectionData()
        }, 1000)
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
