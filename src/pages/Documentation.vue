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
        <section v-if="!showGuideArea">
          <div class="columns">
            <div class="column">
              <h2 class="title has-text-centered">
                Guide Topic
              </h2>
              <hr>
              <div class="content" v-html="topics">
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
        </section>
        <section v-else>
          <h2 class="title has-text-centered">
            Guide Topic
          </h2>
          <hr />
          <button class="btn-back" @click="toggleShowGuideArea">Back</button>
          <div class="content" v-html="topicContent"></div>
          <button class="btn-back" @click="toggleShowGuideArea">Back</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import got from 'got'
  import showdown from 'showdown'
  import cheerio from 'cheerio'

  export default {
    data () {
      return {
        query: 'vue.js',
        questions: [],
        topics: '',
        topicContent: '',
        showGuideArea: false
      }
    },
    mounted () {
      this.so()
      this.getTopics()
      window.vm.getTopicContent = this.getTopicContent
    },
    methods: {
      so () {
        var tags = this.query
        axios.get('https://api.stackexchange.com/2.2/questions?site=stackoverflow&order=desc&sort=activity&filter=default&tagged=' + tags)
        .then((res) => {
          this.questions = res.data.items
        })
      },
      getTopics () {
        got('https://raw.githubusercontent.com/apiko-rest-api/apiko-userguide/master/Index.md')
          .then((res) => {
            const converter = new showdown.Converter()
            const index = res.body.indexOf('* ')
            res.body = res.body.substring(index)
            const html = converter.makeHtml(res.body)
            const $ = cheerio.load(html)
            const elements = $('a')
            for (let i = 0; i < elements.length; i++) {
              let link = 'https://raw.githubusercontent.com/apiko-rest-api/apiko-userguide/master/' + $(elements[i]).attr('href')
              $(elements[i]).removeAttr('href')
              if (elements[i].parent.parent.root) {
                $(elements[i]).attr('onclick', 'vm.getTopicContent(\'' + link + '\')')
              } else {
                $(elements[i]).addClass('no-link')
              }
            }
            this.topics = $.html()
          })
          .catch((error) => {
            console.log(error)
          })
      },
      getTopicContent (link) {
        this.showGuideArea = true
        got(link)
          .then((res) => {
            const converter = new showdown.Converter()
            const html = converter.makeHtml(res.body)
            this.topicContent = html
          })
          .catch((error) => {
            console.log(error)
          })
      },
      toggleShowGuideArea () {
        this.showGuideArea = !this.showGuideArea
        this.topicContent = ''
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

.btn-back {
  background-color: #fff;
  border: 1px solid #888;
  border-radius: 3px;
  padding: 10px 20px;
  margin: 10px;
}
</style>
