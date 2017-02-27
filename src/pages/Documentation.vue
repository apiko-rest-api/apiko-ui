<template>
  <div>
    <br><!-- FIXME with something nicer than br --><br>
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

    <div class="columns">
      <div class="column">
        <div class="hero-body">
          <h2 class="title has-text-centered">
            Guide Topics
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
      </div>
      <div class="column">
        <div class="hero-body">
          <h2 class="title has-text-centered">
            Stack Overflow Q/A
          </h2>
          <hr>
        </div>
        <div class="content">
          <div v-for="q in questions">
            <div v-on:click="goToLink(q.link)" class="clickable">
              <!-- may need fixing to prevent injection, but helps to display html entities -->
              <h1 v-html="q.title"></h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices
                eleifend
                gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper
                dui.
                Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
              </p>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
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
      goToLink (url) {
        // http://stackoverflow.com/a/11384018/1351857
        var win = window.open(url, '_blank')
        win.focus()
      },
      so () {
        var tags = this.query
        axios.get('https://api.stackexchange.com/2.2/questions?site=stackoverflow&order=desc&sort=activity&filter=default&tagged=' + tags)
            .then((res) => {
              console.log(res.data)
              this.questions = res.data.items
            })
      }
    }
  }
</script>

<style scoped>
  .clickable {
    cursor: pointer
  }
</style>
