<template>
  <div class="detail">
    <div class="graph">
      <graphs :graph_data='chartData' :stockSymbol='stockSymbol'/>
    </div>
    <div class="info-buysell">
      <div class="info">
        <div class="info-header">
          <p class="symbol"><strong>{{detailStockInfo.stock_symbol}}</strong></p> <p class="price">${{detailStockInfo.price.toFixed(2)}}</p>
        </div>
        <p v-bind:class="isPositive ? 'positive':'negative'" class="change">   {{detailStockInfo.change.toFixed(2)}}%</p>
        <p class="blah"><strong>Open: ${{detailStockInfo.open.toFixed(2)}}</strong></p>
        <p class="blah"><strong>High: ${{detailStockInfo.high.toFixed(2)}}  Low: ${{detailStockInfo.low.toFixed(2)}}</strong></p>
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
      detailStockInfo: {},
      isPositive: null
    }
  },
  mounted: {
    checkChange: function(){
      if(detailStockInfo.change >= 0){
        return this.isPositive = true;
      } else {
        return this.isPositive = false;
      }
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
            this.detailStockInfo['open'] = parseFloat(payload['Global Quote']['02. open'])
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
        width: 65%;
        height: 77vh;
        background-color: #e3dede;
        margin-top: 1em;
        border-radius: 0 0 0.4em 0.4em;
        padding: 0;
        justify-content: center;
      }

      h1 {
        margin: 0;
      }

      p {
        font-size: 24px
      }

      .symbol {
        font-size: 40px;
        margin: 0px
      }

      .price {
        font-size: 40px;
        padding: 2px;
        margin: 0px;
      }

      .info-header {
        display: flex;
        justify-content: space-between
      }

      .info-header h2 {
        margin: 0;
        padding: 2px
      }

      .change {
        text-align: right;
        margin: 0;
        padding: 2px
      }


    .negative {
      color: red;
    }

    .positive {
      color: green;
    }

      .blah {
        text-align: left;
        font-size: 24px
      }

      .info-buysell {
        width: 100%;
        display: flex;
      }

      .info{
        width: 50%;
        justify-content: left;
      }

      .info_negative {
        background-color: red;
      }

      .info_positive {
        background-color: green;
      }

      .buy-sell {
        width: 50%;
        margin: 10px auto;
      }

      input {
        width: 60%;
        padding: 0;
        border: none;
        font-size: 1.25em;
        margin: 5px 0;
      }

      button {
        width: 30%;
        font-size: 1.25em;
        border: 23px;
        border-color: black
      }

      .sell {
        background-color: #E83A3A;

      }

      .buy {
        background-color: #018E42
      }
    </style>
