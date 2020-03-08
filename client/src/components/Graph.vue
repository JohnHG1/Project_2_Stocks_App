<template lang="html">
  <div class="">
    <highcharts :options="chartOptions"></highcharts>

  </div>

</template>

<script>

import {Chart} from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'

exportingInit(Highcharts)

export default {
  data() {
    return {
      chartOptions: {
        series: [{
          data: this.graph_data
        }]
      }
    }
  },
  props:['graph_data'],
  components: {
    'highcharts': Chart
  }
}
</script>

<style lang="css" scoped>
</style>
