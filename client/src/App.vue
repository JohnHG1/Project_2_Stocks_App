<template>
  <div id="app">
    <portfolio-summary/>
    <stock-list/>
    <detail/>
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
  margin-top: 60px;
}
</style>
