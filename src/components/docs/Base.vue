<template>
  <div v-if="showDocs">
    <collection v-if="name === 'collection'"></collection>
    <collection-data v-if="name === 'collection-data'"></collection-data>
    <collection-property v-if="name === 'collection-property'"></collection-property>
    <collections1 v-if="name === 'collections1'"></collections1>
    <collections2 v-if="name === 'collections2'"></collections2>
    <dashboard v-if="name === 'dashboard'"></dashboard>
    <endpoint1 v-if="name === 'endpoint1'"></endpoint1>
    <endpoint2 v-if="name === 'endpoint2'"></endpoint2>
    <endpoint3 v-if="name === 'endpoint3'"></endpoint3>
    <endpoint4 v-if="name === 'endpoint4'"></endpoint4>
    <endpoint5 v-if="name === 'endpoint5'"></endpoint5>
    <endpoints1 v-if="name === 'endpoints1'"></endpoints1>
    <endpoints2 v-if="name === 'endpoints2'"></endpoints2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Collection from './Collection'
import CollectionData from './CollectionData'
import CollectionProperty from './CollectionProperty'
import Collections1 from './Collections1'
import Collections2 from './Collections2'
import Dashboard from './Dashboard'
import Endpoint1 from './Endpoint1'
import Endpoint2 from './Endpoint2'
import Endpoint3 from './Endpoint3'
import Endpoint4 from './Endpoint4'
import Endpoint5 from './Endpoint5'
import Endpoints1 from './Endpoints1'
import Endpoints2 from './Endpoints2'

export default {
  props: ['name'],
  components: {
    Collection,
    CollectionData,
    CollectionProperty,
    Collections1,
    Collections2,
    Dashboard,
    Endpoint1,
    Endpoint2,
    Endpoint3,
    Endpoint4,
    Endpoint5,
    Endpoints1,
    Endpoints2
  },
  computed: mapState(['showDocs'])
}
</script>
