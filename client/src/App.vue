<template>
  <div id="app">
    <div class="portfolio-summary">
      <portfolio-summary/>
    </div>
    <div class="body">
      <stock-list/>
      <detail :detailStock="detailStock"/>
    </div>
  </div>
</template>

<script>
import Detail from './components/Detail.vue'
import PortfolioSummary from './components/PortfolioSummary.vue'
import StockList from './components/StockList.vue'

export default {
  name: 'App',
  components: {
    'detail': Detail,
    'portfolio-summary': PortfolioSummary,
    'stock-list': StockList
  },
  mounted() {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=fb&outputsize=full&apikey=611FU2Q01I2PT429`)
      .then(res => res.json())
      .then(data => this.detailStock = data["Time Series (Daily)"])
    },
    data() {
      return {
        detailStock: {}
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
