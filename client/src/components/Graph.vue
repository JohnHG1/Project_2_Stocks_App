<template lang="html">
  <div class="">
    <!-- <highcharts :options="chartOptions"></highcharts> -->
    <highcharts :constructor-type="'stockChart'" :options="chartOptions"></highcharts>
  </div>

</template>

<script>

import {Chart} from 'highcharts-vue'
// import Highcharts from 'highcharts'
// import exportingInit from 'highcharts/modules/exporting'
//
// exportingInit(Highcharts)

import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'

stockInit(Highcharts)

export default {
  // data() {
    // return {
    //   chartOptions: {
    //     series: [{
    //       data: this.graph_data
    //     }],
    //     title: {
    //       text: this.stockSymbol
    //     },
    //     subtitle: {
    //       text: ''
    //     }
    //   }

  props:['graph_data', 'stockSymbol'],
  components: {
    'highcharts': Chart
  },
  computed: {
    chartOptions() {
      return {
      series: [{
        data: this.graph_data.reverse()
      }],
      title: {
        text: this.stockSymbol
      },
      subtitle: {
        text: ''
      }
    }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
