<template lang="html">
  <div class="stock-list">
    <input type="text" value="" placeholder="Search" v-model="searchString" list="search-list" @change="handleSearchInputs">
    <datalist id="search-list" v-if="searchResults">
      <option :value="stock['1. symbol']" v-for="stock in searchResults">{{stock["1. symbol"]}}</option>
    </datalist>

    <stock-item/>
  </div>

</template>

<script>
import StockItem from './StockItem.vue'

export default {
  name: 'stock-list',
  components: {
    'stock-item': StockItem
},
data() {
  return {
    searchString: "",
    searchResults: []
  }
},
methods: {
  handleSearchInputs: function (){
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.searchString}&apikey=611FU2Q01I2PT429`)
      .then(res => res.json())
      .then(data => this.searchResults= data["bestMatches"])
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
  display: block;
}

input {
  width: 90%;
  margin: 0 5%;
  padding: 0;
  border: none;
  border-radius: 3px;
}


</style>
