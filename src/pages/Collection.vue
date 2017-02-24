<template>
  <div class="page padded">
    <div class="columns is-mobile">
      <div class="column is-one-quarter">
        <CollectionsList ref="list"></CollectionsList>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">

              <p class="control has-addons is-pulled-right">

                <router-link class="button" active-class=" is-primary" :to="{name: 'collection', params: {id: name}}" exact>
                  <span class="icon is-small">
                    <i class="fa fa-align-left"></i>
                  </span>
                  <span>PROPERTIES <span v-if="showDocs">(STRUCTURE)</span></span>
                </router-link>

                <router-link class="button" active-class=" is-primary" :to="{name: 'collection-data', params: {id: name}}">
                  <span class="icon is-small">
                    <i class="fa fa-database"></i>
                  </span>
                  <span>CONTENT <span v-if="showDocs">(DATA)</span></span>
                </router-link>

              </p>

              <h1>{{ this.name }}</h1>

              <p v-if="this.name === 'users' && showDocs">The user collection is required for user authentication and authorization. It can't be removed.</p>

              <p v-if="showDocs">Imagine properties are columns in a database table. Individual cells in the table will be then identified by their row ID and a property (column) name.</p>

              <table class="table is-striped">
                <thead>
                  <tr><th>Name</th><th>Database Type</th><th></th></tr>
                </thead>
                <tbody>
                  <tr v-for="(prop, name) in currentCollection.core">
                    <td><strong>{{name}}</strong><br v-if="prop.comment"><small v-if="prop.comment" class="text-muted">{{prop.comment}}</small></td>
                    <td>{{prop.type}}</td>
                    <td><span class="tag is-light">core</span></td>
                  </tr>
                  <tr v-for="(prop, name) in currentCollection.setup">
                    <td><strong>{{name}}</strong><br v-if="prop.comment"><small v-if="prop.comment" class="text-muted">{{prop.comment}}</small></td>
                    <td>{{prop.type}}</td>
                    <td><button @click="removeProperty(name)" class="button is-danger is-inverted"><span class="icon"><i class="fa fa-times"></i></span></button></td>
                  </tr>
                </tbody>
              </table>

              <h5>Add / Change Property</h5>

              <p v-if="showDocs">Input an existing property name to change it or a new property name to add a new property to this collection.</p>

              <form ref="editForm" @submit.prevent="updateProperty">
                <div class="control is-grouped">
                  <p class="control is-expanded">
                    <input v-model="propertyName" class="input" type="text" placeholder="Lowercase name, e.g.: 'author'">
                  </p>
                  <p class="control has-addons">
                    <span class="select">
                      <select v-model="editPropertyType">
                        <option v-for="(lengths, type) in availableTypes">{{ type }}</option>
                      </select>
                    </span>
                    <input v-model="editPropertyTypeLength" class="input" type="text" placeholder="Length">
                  </p>
                  <p class="control">
                    <button type="submit" class="button is-primary"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD</span></button>
                  </p>
                </div>
                <p>&nbsp;<small v-if="typeDescription">{{ typeDescription }}</small></p>
                <p class="control is-expanded">
                  <input v-model="editPropertyComment" class="input" type="text" placeholder="Optional comment">
                </p>
              </form>

              <div v-if="showDocs" style="margin-top: 20px;">
                <h4>Examples</h4>
                <p>Not sure about types? Here are some examples:</p>
                <ul>
                  <li>Article content - TEXT (default lenght)</li>
                  <li>Article title - STRING (default length)</li>
                  <li>Unix timestamp - INT (default lenght)</li>
                  <li>Any kind of checkboxes or true/false values - BOOLEAN (default lenght)</li>
                  <li>Latitude - DECIMAL (10,8), longitude - DECIMAL (11, 8)</li>
                  <li>Longitude - DECIMAL (11, 8)</li>
                  <li>Money - DECIMAL (19,4)</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionsList from '../components/CollectionsList'
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    CollectionsList
  },
  data () {
    return {
      availableTypes: {
        INTEGER: '1-2147483647',
        CHAR: '1-255',
        STRING: '1-255',
        TEXT: 'tiny,medium,long',
        BIGINT: '9223372036854775807',
        FLOAT: '',
        DOUBLE: '',
        DECIMAL: '',
        BOOLEAN: '',
        TIME: '',
        DATE: '',
        DATEONLY: '',
        BLOB: 'tiny,medium,long',
        ENUM: ''
      },

      propertyName: '',
      editPropertyType: 'INTEGER',
      editPropertyTypeLength: '',
      editPropertyComment: ''
    }
  },
  computed: {
    name () {
      return this.$route.params.id
    },
    currentCollection () {
      return this.collection(this.name)
    },
    typeDescription () {
      var desc = ''
      switch (this.editPropertyType) {
        case 'INTEGER':
          desc = 'Integer number, length ' + this.availableTypes.INTEGER + ' or empty for default.'
          break
        case 'STRING':
          desc = 'A variable length string (VARCHAR), length ' + this.availableTypes.STRING + ' or empty for default (255).'
          break
        case 'CHAR':
          desc = 'A fixed length string, length ' + this.availableTypes.CHAR + ' or empty for default (255).'
          break
        case 'TEXT':
          desc = 'Longer string (e.g. for articles), length \'' + this.availableTypes.TEXT.split(',').join('\', \'') + '\' or empty for default.'
          break
        case 'BIGINT':
          desc = 'An attribute defined as BIGINT will be treated like a string in order to prevent precision loss. Leave the length empty.'
          break
        case 'FLOAT':
          desc = 'Floating point number (4-byte precision), comma-separated lengths, e.g.: 5,2'
          break
        case 'DOUBLE':
          desc = 'Floating point number (8-byte precision), comma-separated lengths, e.g.: 5,2'
          break
        case 'DECIMAL':
          desc = 'Decimal number, comma-separated lengths, e.g.: 5,2'
          break
        case 'BOOLEAN':
          desc = 'A Boolean or TINYINT, depending on database. Leave length empty.'
          break
        case 'TIME':
          desc = 'A TIME column. Leave length empty.'
          break
        case 'DATE':
          desc = 'A DATETIME column. Leave length empty.'
          break
        case 'DATEONLY':
          desc = 'A date only column. Leave length empty.'
          break
        case 'BLOB':
          desc = 'Binary storage (e.g. for files), length \'' + this.availableTypes.BLOB.split(',').join('\', \'') + '\' or empty for default.'
          break
        case 'ENUM':
          desc = 'Enumeration, comma-separated allowed values, e.g.: Tokyo,Bogota,Prague'
          break
      }

      return desc
    },
    ...mapState(['showDocs']),
    ...mapGetters(['collection'])
  },
  methods: {
    updateProperty () {
      const prop = {
        type: (this.editPropertyType + (this.editPropertyTypeLength ? ' ' + this.editPropertyTypeLength : ''))
      }
      if (this.editPropertyComment) {
        prop.comment = this.editPropertyComment
      }
      this.$store.commit('UPDATE_PROPERTY', {
        collection: this.name,
        name: this.propertyName,
        prop
      })
      this.$forceUpdate()
    },
    removeProperty (name) {
      this.$store.commit('REMOVE_PROPERTY', {
        collection: this.name,
        name
      })
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 0 !important;
  text-transform: uppercase;
}
</style>
