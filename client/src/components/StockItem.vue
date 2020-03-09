<template lang="html">
  <div class="stock-item">
    <div class="item_line_1">
      <span>{{stock['stock_symbol']}}</span>
      <span>£{{parseFloat(stock['number_of_shares']*stock['price']).toFixed(2)}}</span>
      <p>{{stock.number_of_shares}} @ {{stock.price}}</p>
    </div>

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
justify-content: space-between;
font-size: 1.5em;
border-bottom: 1px solid black;
padding: 2% 0;
}

p{
  text-align: right;
  font-size: 1em;
}

</style>
