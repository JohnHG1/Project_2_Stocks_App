<template lang="html">
  <div class="stock-list-container">

    <div class="stock-search">
      <input type="text" value="" placeholder="Search" v-model="searchString" list="search-list" @change="handleSearchInputs">

      <select id="search-list" v-if="searchResults.length !== 0" @change="handleStockSearchSelect" v-model="selectedResult">
            <option v-for="stock in searchResults" :value="stock" ><b>{{stock["2. name"]}}</b>: {{stock["8. currency"]}}</option>
      </select>
    </div>

    <div class="user-stock-list">
      <stock-item @click.native="handleStockClick(stock)" v-for="stock in userStocks" :stock="stock"/>
    </div>

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
    searchResults: [],
    selectedResult: {}
  }
},
methods: {
  handleSearchInputs: function (event){
    console.log("handle search input", event.target.value);
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.searchString}&apikey=${process.env.VUE_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => this.searchResults= data["bestMatches"])
  },
  handleStockClick: function(stock){
    eventBus.$emit('stock-selected', stock)
  },
  // searchResultSelect: function(e) {
  //   console.log(e["1. symbol"]);
  // },
  handleStockSearchSelect: function(){
    eventBus.$emit('result-selected', this.selectedResult["1. symbol"])
    }
  }
}
</script>

<style lang="css" scoped>
div {
  border-radius: 0.4em;
}
.stock-list-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 20vw;
  height: 77vh;
  align-content: space-between;
  margin: 1em;
}
.stock-search {
  width: 20vw;
  height: 10vh;
  background-color: lightgrey;
}
input {
  width: 90%;
  margin: 3.5% 5%;
  padding: 0;
  border: none;
  border-radius: 3px;
  font-size: 2em;
}
select {
  font-size: 0.9em;
  background-color: grey;
  color: #f2f2f2;
}
.user-stock-list {
  width: 20vw;
  height: 64vh;
  padding: 4px 4px;
  margin: 0;
  background-color: lightgrey;
}


</style>
