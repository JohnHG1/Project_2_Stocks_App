<template>
  <div id="app">

    <div class="portfolio-summary">
      <portfolio-summary :userStocks="userStocks"/>
    </div>

    <div class="main">
      <stock-list :userStocks="userStocks"/>
      <detail :userStocks="userStocks" :detailStock="detailStock"/>
    </div>

  </div>
</template>

<script>
import Detail from './components/Detail.vue'
import PortfolioSummary from './components/PortfolioSummary.vue'
import StockList from './components/StockList.vue'
import StockService from './services/StockService.js'
import {eventBus} from './main.js';


export default {
  name: 'App',
  components: {
    'detail': Detail,
    'portfolio-summary': PortfolioSummary,
    'stock-list': StockList
  },
  mounted() {
    this.fetchUserStocks();

    eventBus.$on('share-added', res => this.fetchUserStocks());

    eventBus.$on('stock-selected', stock => this.handleStockSelect(stock) );

    eventBus.$on('result-selected', symbol => this.handleResultSelect(symbol) );
    },
    data() {
      return {
        detailStock: {},
        detailStockSymbol: "",
        userStocks: []
      }
    },
    methods: {
      fetchUserStocks: function () {
        StockService.getStocks()
        .then(payload => {
          this.userStocks = [];
          for (const stock of payload) {
            // this.userStocks.push(stock)
            this.fetchStockPrice(stock)
          }
        })
      },
      fetchStockPrice: function (stock) {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock['stock_symbol']}&apikey=${process.env.VUE_APP_API_KEY}`)
          .then(res => res.json())
          .then(payload => {
            stock['price'] = parseFloat(payload['Global Quote']['05. price'])
            stock['open'] = parseFloat(payload['Global Quote']['02. open'])
            stock['high'] = parseFloat(payload['Global Quote']['03. high'])
            stock['low'] = parseFloat(payload['Global Quote']['04. low'])
            stock['change'] = parseFloat(payload['Global Quote']['10. change percent'])

            this.userStocks.push(stock)
        })
      },
      handleStockSelect: function(stock){
        // console.log(stock.stock_symbol);
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.stock_symbol}&outputsize=full&apikey=${process.env.VUE_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => this.detailStock = data)
      },
      handleResultSelect: function(symbol){
        // console.log(stock.stock_symbol);
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.VUE_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => this.detailStock = data)
      }
    }
  }

</script>

<style>
body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: darkgrey;
  height: 100vh;
}

.portfolio-summary {
  width: 100%;
  height: 70px;
}

.main {
  display: flex;
}

</style>
