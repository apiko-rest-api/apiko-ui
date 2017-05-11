<template>
  <div class='page padded'>
    <div class='content'>
      <h1 style='text-align: center;'>Welcome to Apiko!</h1>
    </div>

    <doc name='dashboard'></doc>

    <div class='card'>
      <div class='card-content'>
        <div class='content' style='text-align: center'>
          <router-link class='button is-big is-primary' active-class='is-active' to='/collections'>
            <span class='icon'>
              <i class='fa fa-database'></i>
            </span>
            <span>CREATE A COLLECTION</span>
          </router-link>
          <router-link class='button is-big is-primary' active-class='is-active' to='/endpoints'>
            <span class='icon'>
              <i class='fa fa-map-signs'></i>
            </span>
            <span>CREATE AN ENDPOINT</span>
          </router-link>



            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Requests per api</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="charts">
                    <div class='chart-container'>
                      <canvas id='chart-line'></canvas>
                    </div>
                    <div class='chart-container'>
                      <canvas id='chart-bar'></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import api from '../store/api'

export default {
  data () {
    return {
      chartRaw: null,
      colors: [
        'rgba(0, 74, 34, 0.85)',
        'rgba(0, 138, 67, 0.86)',
        'rgba(3, 168, 94, 0.8)',
        'rgba(72, 214, 157, 0.86)',
        'rgba(0, 227, 165, 0.73)',
        'rgba(0, 0, 0, 0.53)'
      ]
    }
  },
  computed: {
    chartData () {
      let result = {}
      if (!this.chartRaw) return {}
      this.chartRaw.forEach(e => {
        if (result[e.endpoint]) {
          result[e.endpoint] += 1
        } else {
          result[e.endpoint] = 1
        }
      })
      return result
    },
    frequencyData () {
      let result = {}
      if (!this.chartRaw) return {}
      this.chartRaw.forEach(e => {
        let date = this.format(e.createdAt)
        if (result[date] && result[date][e.endpoint]) {
          result[date][e.endpoint] += 1
        } else if (result[date] && !result[date][e.endpoint]) {
          result[date][e.endpoint] = 1
        } else {
          result[date] = {}
          result[date][e.endpoint] = 1
        }
      })
      return result
    },
    frequencyLabels () {
      if (!this.frequencyData) return []
      return Object.keys(this.frequencyData)
    },
    frequencyDataSets () {
      let dataSet = []
      let result = {}
      Object.keys(this.frequencyData).forEach((e, i) => {
        for (let key in this.frequencyData[e]) {
          if (result[key]) {
            result[key].val.push(this.frequencyData[e][key])
            result[key].i.push(i - 1)
          } else {
            result[key] = {
              val: [this.frequencyData[e][key]],
              i: [i - 1]
            }
          }
        }
      })
      console.log(result)
      Object.keys(result).forEach((key, i) => {
        let obj = {
          label: key,
          data: [],
          backgroundColor: this.colors[i]
        }
        for (let v = 0; v <= result[key].i[result[key].i.length - 1]; v++) {
          obj.data[v] = (result[key].i.indexOf(v) > -1) ? result[key].val[result[key].i.indexOf(v)] : 0
        }
        dataSet.push(obj)
      })
      return dataSet
    },
    labels () {
      if (!this.chartRaw) return []
      return Object.keys(this.chartData)
    },
    createdData () {
      let data = []
      for (let key in this.chartData) {
        data.push(this.chartData[key])
      }
      return data
    },
    updatedData () {
      return []
    }
  },
  methods: {
    getStats () {
      return api.get(`/apiko/stats`)
      .then(res => {
        this.chartRaw = res.data
      })
    },
    format (date) {
      date = new Date(date)
      let d = date.getDate()
      let m = date.getMonth() + 1
      let y = date.getFullYear()
      return `${d}/${m}/${y}`
    },
    drawStackedChart (id, type) {
      let ctx = document.getElementById(id)
      let chart = new Chart(ctx, {
        type: type,
        data: {
          labels: this.frequencyLabels,
          datasets: this.frequencyDataSets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: false
              }
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: false
              }
            }]
          }
        }
      })
      console.log(chart)
    },
    drawChart (id, type, data, labels) {
      let ctx = document.getElementById(id)
      let opts = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
      let chart = new Chart(ctx, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: 'Requests per api',
            data: data,
            backgroundColor: [
              'rgba(72, 214, 157, 0.86)',
              'rgba(0, 74, 34, 0.85)',
              'rgba(0, 138, 67, 0.86)',
              'rgba(3, 168, 94, 0.8)'
            ]
          }]
        },
        options: opts
      })
      chart
    }
  },
  watch: {
    chartData () {
      this.drawChart('chart-line', 'line', this.createdData, this.labels)
      this.drawStackedChart('chart-bar', 'bar')
    }
  },
  created () {
    this.getStats()
  }
}
</script>

<style scoped>
  canvas {
    width: 100%;
  }
  .chart-container {
    width: 45%;
    height: 100%;
  }
  .charts > * {
    display: inline-block;
    vertical-align: top;
  }
  .card {
    margin: 1rem 0;
  }
</style>
