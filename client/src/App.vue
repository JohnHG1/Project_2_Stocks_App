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

export default {
  name: 'App',
  components: {
    'detail': Detail,
    'portfolio-summary': PortfolioSummary,
    'stock-list': StockList
  },
  mounted() {
    this.fetchUserStocks();
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=fb&outputsize=full&apikey=611FU2Q01I2PT429`)
      .then(res => res.json())
      .then(data => this.detailStock = data)


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
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock['stock_symbol']}&apikey=611FU2Q01I2PT429`)
          .then(res => res.json())
          .then(payload => {
            stock['price'] = parseFloat(payload['Global Quote']['05. price'],2)
            this.userStocks.push(stock)
        })
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
