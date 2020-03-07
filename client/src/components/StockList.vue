<template lang="html">
  <div class="stock-list">
    <input type="text" value="" placeholder="Search" v-model="searchString">
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
    searchString: ""
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

input {
  width: 90%;
  margin: 0 5%;
  padding: 0;
  border: none;
  border-radius: 3px;
}


</style>
