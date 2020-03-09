<template>
  <div class="detail">
  <graphs v-if="chartData" :graph_data='chartData' :stockSymbol='stockSymbol'/>
    <!-- <button type="button" @click="formatChartData">run formatter</button> -->
  </div>
</template>

<script>
import Graph from './Graph.vue';
import {eventBus} from '../main.js';

export default {
  name: 'Detail',
  props: ['detailStock'],
  components:{
      'graphs': Graph
  },
  data() {
    return {
      chartData: [],
      stockData: null,
      stockSymbol: null
    }
  },
  watch: {
    detailStock: function () {
      this.formatChartData();
      console.log('formatChartData called');
    }


  },
  methods: {
    formatChartData: function () {
      this.chartData = [];
      // console.log(this.detailStock);
      this.stockData = this.detailStock['Time Series (Daily)'];
      // this.stockSymbol = this.detailStock["Meta Data"]["2. Symbol"];
      // console.log(this.stockData);
      for (const key of Object.keys(this.stockData)) {
        this.chartData.push([
          Math.round(new Date(key).getTime()/1000),
          parseFloat(this.stockData[key]['4. close'])
        ])
      }
      console.log('chartData:',this.chartData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.detail {
  width: 75%;
  height: 700px;
  background-color: lightgrey;
  margin: 0 auto;
  padding: 0;
}

h1 {
  margin: 0;
}

</style>
