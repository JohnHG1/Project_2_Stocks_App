<template lang="html">
  <div class="stock-item">
    <span>{{stock['stock_symbol']}}</span>
    <span>£{{parseFloat(stock['number_of_shares']*stock['price']).toFixed(2)}}</span>
  </div>
</template>

<script>
export default {
  name: 'stockItem',
  props: ['stock']
}
</script>

<style lang="css" scoped>
.stock-item {
display: flex;
justify-content: space-around;
font-size: 1.5em;
border-bottom: 1px solid black;
padding: 2% 0;
}
</style>
