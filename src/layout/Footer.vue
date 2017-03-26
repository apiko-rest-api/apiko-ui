<template>
  <footer class="footer">

    <router-link to="/stats" class="stats">
      <span class="icon">
        <i class="fa fa-bar-chart"></i>
      </span>
      {{ statsCounter }} requests past 30 days
    </router-link>

    <router-link to="/config?update" class="config">
      <span class="icon">
        <i class="fa fa-plug"></i>
      </span>
      Connected to: {{ $store.state.apiUrl }}
    </router-link>

    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>Apiko</strong> is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          Source code is available on <a href="https://github.com/apiko-rest-api">Github</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import stats from '../api/stats'

export default {
  data () {
    return {
      statsCounter: '?'
    }
  },
  created () {
    this.getStatsCounter()
  },
  methods: {
    getStatsCounter () {
      stats.getStatsCounter().then(res => {
        this.statsCounter = res.data.counter
      })
    }
  }
}
</script>

<style scoped>
footer {
  position: relative;
  padding-top: 4rem;
  margin-top: auto; /* Stick footer to bottom. */
}
footer .stats, footer .config {
  position: absolute;
  top: 10px;
  color: #888;
}
footer .stats:hover, footer .config:hover {
  color: #000;
}
footer .stats {
  left: 10px;
}
footer .config {
  right: 10px;
}
</style>
