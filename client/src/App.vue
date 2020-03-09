<template>
  <div id="app">
    <div class="portfolio-summary">
      <portfolio-summary/>
    </div>
    <div class="body">
      <stock-list :userStocks="userStocks"/>
      <detail :detailStock="detailStock"/>
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

    eventBus.$on('stock-selected', stock => this.handleStockSelect(stock) );
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
          for (const stock of payload) {
            this.fetchStockPrice(stock)
          }
        })
      },
      fetchStockPrice: function (stock) {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock['stock_symbol']}&apikey=${process.env.VUE_APP_API_KEY}`)
          .then(res => res.json())
          .then(payload => {
            stock['price'] = parseFloat(payload['Global Quote']['05. price'])
            this.userStocks.push(stock)
        })
      },
      handleStockSelect: function(stock){
        // console.log(stock.stock_symbol);
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.stock_symbol}&outputsize=full&apikey=${process.env.VUE_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => this.detailStock = data)
      }
    }
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.portfolio-summary {
  width: 100%;
  height: 70px;
}

.body {
  display: flex
}

</style>
