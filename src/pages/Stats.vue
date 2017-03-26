<template>
  <div class="stats-wrapper">
    <div class="box filter-box">
      <span>From: </span>
      <el-date-picker
        v-model="startDate"
        type="date"
        :clearable="false"
        :editable="false">
      </el-date-picker>

      <span>To: </span>
      <el-date-picker
        v-model="endDate"
        type="date"
        :clearable="false"
        :editable="false">
      </el-date-picker>

      <a class="button is-primary" @click="getStats">Get Stats</a>
    </div>

    <div class="box">
      <table class="table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>IP</th>
            <th>User</th>
            <th>Create Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in statsList">
            <td>{{ row.endpoint }}</td>
            <td>{{ row.ip }}</td>
            <td>
              <span v-if="row.user">{{ row.user.username }}</span>
              <span v-else>-</span>
            </td>
            <td>{{ row.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import stats from '../api/stats'

export default {
  data () {
    return {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
      statsList: []
    }
  },
  created () {
    stats.getStatsList().then(res => {
      this.statsList = res.data
    })
  },
  methods: {
    getStats () {
      stats.getStatsList({
        start: this.startDate.valueOf(),
        end: this.endDate.valueOf()
      }).then(res => {
        this.statsList = res.data
      })
    }
  }
}
</script>

<style lang="scss">
  .stats-wrapper {
    padding: 30px;

    .filter-box {
      .el-date-editor--date {
        margin-right: 15px;

        .el-input__inner {
          height: 2.285em;
        }
      }
    }
  }
</style>
