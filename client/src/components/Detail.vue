<template>
  <div class="detail">
  <graphs v-if="chartData" :graph_data='chartData' :stockSymbol='stockSymbol'/>
  <div class="buttons">
    <form class="" action="index.html" method="post">
      <label for="number_of_shares">Quantity</label>
      <input type="number" id="number_of_shares" v-model='number_of_shares'>
      <button v-model='stockSymbol' type="button" @click="buyShare">Buy Shares</button>
      <button type="button" @click="sellShare">Sell Shares</button>
    </form>
  </div>
  </div>
</template>

<script>
import Graph from './Graph.vue';
import StockService from '../services/StockService.js';
import {eventBus} from '../main.js';

export default {
  name: 'Detail',
  props: ['detailStock', 'userStocks'],
  components:{
      'graphs': Graph
  },
  data() {
    return {
      chartData: [],
      stockData: null,
      stockSymbol: null,
      number_of_shares: null
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
          Math.round(new Date(key).getTime()),
          parseFloat(this.stockData[key]['4. close'])
        ])
      }
      console.log('chartData:',this.chartData);
    },
    buyShare: function (e) {
      e.preventDefault();
      const share = {
        stock_symbol: this.detailStock["Meta Data"]["2. Symbol"],
        number_of_shares: parseInt(this.number_of_shares)
      };
      for (let stock of this.userStocks){
        if (share.stock_symbol === stock.stock_symbol){
          share.number_of_shares += stock.number_of_shares
          StockService.updateStock(stock._id, share)
          .then(res => res.json())
          .then(res => eventBus.$emit('share-added', res))
          .then(res => console.log(res))
            return
          }
        }
      StockService.postStock(share)
      .then(res => eventBus.$emit('share-added', res))
    },
    sellShare: function () {
      console.log("Sell Share Button");
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
