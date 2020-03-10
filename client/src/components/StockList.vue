<template lang="html">
  <div class="stock-list">
    <input type="text" value="" placeholder="Search" v-model="searchString" list="search-list" @change="handleSearchInputs">


      <!-- <ul id="search-list" v-if="searchResults">
        <li @click.native="searchResultSelect" :value="stock['1. symbol']" v-for="stock in searchResults">{{stock["1. symbol"]}}</li>
      </ul> -->
      <select id="search-list" v-if="searchResults.length !== 0" @change="handleStockSearchSelect" v-model="selectedResult">
          <option v-for="stock in searchResults" :value="stock" ><b>{{stock["2. name"]}}</b>: {{stock["8. currency"]}}</option>
      </select>


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
