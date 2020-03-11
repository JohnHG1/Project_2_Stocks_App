<template>
  <div class="detail">
    <div class="graph">
      <graphs :graph_data='chartData' :stockSymbol='stockSymbol'/>
    </div>
    <div class="info-buysell">
      <div class="info">
        <div class="info-header">
          <h2>{{detailStockInfo.stock_symbol}} ${{detailStockInfo.price.toFixed(2)}}</h2>
          <p>{{detailStockInfo.change.toFixed(2)}}</p>
          <p>Open: ${{detailStockInfo.open.toFixed(2)}}</p>
          <p>High: ${{detailStockInfo.high.toFixed(2)}}  Low: ${{detailStockInfo.low.toFixed(2)}}</p>
        </div>
      </div>

      <div class="buy-sell">
        <input type="number" id="number_of_shares" v-model='number_of_shares' placeholder="enter amount">
        <div class="buttons">
          <button class="buy" type="button" @click="buyShare">BUY</button>
          <button class="sell" type="button" @click="sellShare">SELL</button>
        </div>
      </div>
    </div>
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
      number_of_shares: null,
      detailStockInfo: {}
    }
  },
  watch: {
    detailStock: function () {
      this.formatChartData();
      this.populateStockInfo();
    }
  },
  methods: {
    formatChartData: function () {
      this.chartData = [];

      this.stockData = this.detailStock['Time Series (Daily)'];
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
            if (stock.number_of_shares === 0) {
              StockService.deleteStock(stock._id)
            }
            this.number_of_shares = null;
            return
          }
        }
        alert("Insufficient shares!")
      },
      populateStockInfo: function(){
        for (let stock of this.userStocks){
          if (this.detailStock['Meta Data']['2. Symbol'] === stock.stock_symbol){
            this.detailStockInfo = stock
            return
          }
        }
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.detailStock["Meta Data"]["2. Symbol"]}&apikey=${process.env.VUE_APP_API_KEY}`)
          .then(res => res.json())
          .then(payload => {
            this.detailStockInfo={}
            console.log(payload);
            this.detailStockInfo['price'] = parseFloat(payload['Global Quote']['05. price'])
            this.detailStockInfo['close'] = parseFloat(payload['Global Quote']['02. open'])
            this.detailStockInfo['high'] = parseFloat(payload['Global Quote']['03. high'])
            this.detailStockInfo['low'] = parseFloat(payload['Global Quote']['04. low'])
            this.detailStockInfo['change'] = parseFloat(payload['Global Quote']['10. change percent'])
            this.detailStockInfo['stock_symbol'] = payload['Global Quote']['01. symbol']
            console.log(this.detailStockInfo);
        })

      }
    }
  }

</script>


    <style scoped>

      .detail {
        width: 75%;
        height: 700px;
        background-color: lightgrey;
        margin-top: 1em;
        margin: 0 auto;
        padding: 0;
        justify-content: center;
      }

      h1 {
        margin: 0;
      }

      .info-buysell {
        width: 100%;
        display: flex;
        background-color: green;
      }

      .info{
        width: 50%;
        justify-content: left;
        background-color: red;
      }

      .buy-sell {
        width: 50%;
        margin: 10px auto;
        background-color: blue;
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
        font-size: 1.25em;
      }

      .sell {
        background-color: #E83A3A;
      }

      .buy {
        background-color: #018E42
      }
    </style>
