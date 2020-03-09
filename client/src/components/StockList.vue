<template lang="html">
  <div class="stock-list">
    <input type="text" value="" placeholder="Search" v-model="searchString" list="search-list" @change="handleSearchInputs">
    <datalist id="search-list" v-if="searchResults">
      <option :value="stock['1. symbol']" v-for="stock in searchResults">{{stock["1. symbol"]}}</option>
    </datalist>
    <stock-item @click.native="handleStockClick(stock)" v-for="stock in userStocks" :stock="stock"/>
  </div>

</template>

<script>
import StockItem from './StockItem.vue';
import Detail from './Detail.vue';
import App from '../App.vue';
import {eventBus} from '../main.js';



export default {
  name: 'stock-list',
  components: {
    'stock-item': StockItem
},
props: ['userStocks'],
data() {
  return {
    searchString: "",
    searchResults: []
  }
},
methods: {
  handleSearchInputs: function (){
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.searchString}&apikey=${process.env.VUE_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => this.searchResults= data["bestMatches"])
  },
  handleStockClick: function(stock){
    eventBus.$emit('stock-selected', stock)
    // App.handleStockSelect(stock)
    // take in current clicked symbol
    // pass symbol
  }
}
}
</script>

<style lang="css" scoped>
.stock-list {
  width: 20%;
  height: 700px;
  background-color: lightgrey;
  padding: 0;
  margin: 0;
}

datalist {
  /* display: block; */
}

input {
  width: 90%;
  margin: 2% 5%;
  padding: 0;
  border: none;
  border-radius: 3px;
  font-size: 1.25em;
}


</style>
