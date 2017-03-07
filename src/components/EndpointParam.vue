<template>
  <form @submit.prevent="updateEndpointParam">
    <div class="control is-grouped">
      <p class="control is-expanded">
        <input v-model="name" class="input" type="text" placeholder="Lowercase name, e.g.: 'author'">
      </p>
      <p class="control is-expanded">
        <input v-model="validation" class="input" type="text" placeholder="Validation regular expression">
      </p>
      <p class="control">
        <button type="submit" class="button is-expanded is-primary"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>ADD</span></button>
      </p>
    </div>
    <p class="control pull-right">
      <input type="checkbox" v-model="required">
      Required
    </p>
    <p class="control">
      <span class="select">
        <select v-model="validation">
          <option value="">CUSTOM REGEX</option>
          <option v-for="regex in availableRegex" :value="regex.validation">
            {{ regex.label }}
          </option>
        </select>
      </span>
    </p>
    <p v-if="currentRegex">
      <small>{{ currentRegex.description }}</small>
    </p>
  </form>
</template>

<script>
export default {
  props: ['path', 'param'],
  created () {
    this.getEndpointParam()
  },
  watch: {
    path () {
      this.getEndpointParam()
    }
  },
  methods: {
    getEndpointParam () {
      // TODO
    },
    updateEndpointParam () {
      // TODO check that the name hasn't been changed for one that exists already
      this.$store.commit('UPDATE_ENDPOINT_PARAM', this.paramSetup)
      this.$parent.$forceUpdate()
      this.$emit('save')
    }
  },
  computed: {
    currentRegex () {
      const regex = this.availableRegex.filter(regex => regex.validation === this.validation)
      return regex.length > 0 ? regex[0] : null
    },
    paramSetup () {
      let payload = {
        path: this.path,
        name: this.name,
        originalName: null,
        param: {
          regex: this.validation,
          required: this.required
        }
      }
      if (this.param && this.param.name) {
        payload.originalName = this.param.name
      }
      return payload
    }
  },
  data () {
    return {
      // param definition
      name: '',
      validation: '',
      required: false,
      // regex configuration
      availableRegex: [
        {
          label: 'Any string 1-100 chars',
          validation: '^.{1,10}$',
          description: 'Any string between 1 and 100 characters.'
        },
        {
          label: 'Number 1-10 digits',
          validation: '^\\d{1,10}$',
          description: 'A number with the maximum of 10 digits. A 32 bit integer is 2,147,483,647 at max.'
        },
        {
          label: 'Basic username',
          validation: '^[a-z0-9_\\.]{3,16}$',
          description: 'Such string may contain lowercase characters, numbers, dots, underscores and may be 3 to 16 chaters long.'
        },
        {
          label: 'Email simple',
          validation: '^\\S+\\@\\S+\\.\\S+$',
          description: 'Simple email only checking for something@something.something'
        },
        {
          label: 'Password 8+ al-nu up-lo',
          validation: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$',
          description: 'Password 8 chars or longer, at least one lowercase, at least one capital, at least one number.'
        },
        {
          label: 'Tag / slug',
          validation: '^[a-z0-9-]+$',
          description: 'Any word that may include hyphens, e.g. apiko-ui or api-reference'
        },
        {
          label: 'Hex color',
          validation: '^#?([a-f0-9]{6}|[a-f0-9]{3})$',
          description: 'Any hexadecimal number of 3 or 6 digits, starting with #.'
        },
        {
          label: 'URL',
          validation: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
          description: 'Any string that looks like a URL.'
        }
      ]
    }
  }
}
</script>
