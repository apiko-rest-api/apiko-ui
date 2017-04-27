<template>
  <div class="page padded">
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <div class="control is-grouped">
          <p class="control is-expanded has-icon has-icon-right">
            <input class="input is-medium" type="text" placeholder="Search a topic..." v-model="query">
            <span class="icon">
                        <i class="fa fa-search"></i>
                    </span>
          </p>
          <p class="control">
            <button class="button is-medium" v-on:click="so()">
              Search
            </button>
          </p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
              <h2 class="title has-text-centered">Guide Topic
              </h2>
              <hr>
              <div class="content">
                <ul>
                  <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
                  <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
                  <li>
                    <ul>
                      <li>
                        In fermentum leo eu lectus mollis, quis dictum mi aliquet.
                      </li>
                    </ul>
                  </li>
                  <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
                  <li>Ut non enim metus.</li>
                </ul>
            </div>
          </div>
          <div class="column">
              <h2 class="title has-text-centered">Stack Overflow Q/A</h2>
              <hr>
            <div class="content">
              <div v-if="questions.length">
                <div class="question" v-for="q in questions">
                  <h2><a v-html="q.title" :href="q.link" target="_blank"></a></h2>
                  <p class="tags">
                    <span v-if="q.is_answered" class="tag is-primary">Answered</span>
                    <span v-for="tag in q.tags" class="tag is-light">{{tag}}</span>
                  </p>
                  <p>{{q.answer_count}} answers, asked {{q.creation_date | datetime}} by {{q.owner.display_name}}</p>
                </div>
              </div>
              <div v-else class="has-text-centered">No questions matching this criteria.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  export default {
    data () {
      return {
        query: 'vue.js',
        questions: []
      }
    },
    mounted () {
      this.so()
    },
    methods: {
      so () {
        var tags = this.query
        axios.get('https://api.stackexchange.com/2.2/questions?site=stackoverflow&order=desc&sort=activity&filter=default&tagged=' + tags)
        .then((res) => {
          this.questions = res.data.items
        })
      }
    },
    filters: {
      datetime (timestamp) {
        return moment.unix(timestamp).format('MMM Do YYYY')
      }
    }
  }
</script>

<style scoped>
.question {
  margin-bottom: 32px;
}

.question .tag {
  margin-right: 6px;
}

.question h2 {
  margin-top: 0;
  margin-bottom: 6px;
}

.question p.tags {
  margin-bottom: 6px;
}
</style>
