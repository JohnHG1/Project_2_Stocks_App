<template>
  <div class="detail">
  <graphs v-if="chartData" :graph_data='chartData' :stockSymbol='stockSymbol'/>
  <div class="buy-sell">
      <!-- <label for="number_of_shares">Quantity</label> -->
      <input type="number" id="number_of_shares" v-model='number_of_shares' placeholder="enter amount">
      <div class="buttons">
        <button class="buy" type="button" @click="buyShare">BUY</button>
        <button class="sell" v-if="userStocks" type="button" @click="sellShare">SELL</button>
      </div>
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
    }
  },
  methods: {
    formatChartData: function () {
      this.chartData = [];

      this.stockData = this.detailStock['Time Series (Daily)'];
      // this.stockSymbol = this.detailStock["Meta Data"]["2. Symbol"];
      for (const key of Object.keys(this.stockData)) {
        this.chartData.push([
          Math.round(new Date(key).getTime()),
          parseFloat(this.stockData[key]['4. close'])
        ])
      }
    },
    buyShare: function () {
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
            this.number_of_shares = null;
            return
          }
        }
      StockService.postStock(share)
      .then(res => eventBus.$emit('share-added', res))
      this.number_of_shares = null;
    },
    sellShare: function () {
      const share = {
        stock_symbol: this.detailStock["Meta Data"]["2. Symbol"],
        number_of_shares: parseInt(this.number_of_shares)
      };
      for (let stock of this.userStocks){
        if (share.stock_symbol === stock.stock_symbol &&
        share.number_of_shares <= stock.number_of_shares){
          stock.number_of_shares -= share.number_of_shares
          StockService.updateStock(stock._id, stock)
          .then(res => res.json())
          .then(res => eventBus.$emit('share-added', res))
          this.number_of_shares = null;
            return
          }
        }
        alert("nae stocks")
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
  justify-content: center;
}

h1 {
  margin: 0;
}

.buy-sell {
  width: 20%;
  margin: 10px auto
}

input {
  width: 100%;
  padding: 0;
  border: none;
  font-size: 1.25em;
  margin: 5px 0;
}

button {
  width: 50%;
  font-size: 1.25em
}

.buy {
  background-color: #E83A3A;
}

.sell {
  background-color: #018E42
}
</style>
