<template lang="html">
  <div class="stock-item">
    <div class="top-line">
      <span>{{stock['stock_symbol']}}</span>
      <span>${{parseFloat(stock['number_of_shares']*stock['price']).toFixed(2)}}</span>
    </div>
    <div class="bottom-line">
      <p>{{stock.number_of_shares}} @ ${{stock.price}}</p>
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
  width: 100%;
display: block;
border-bottom: 1px solid black;
margin: 0;
}

.top-line {
  display: flex;
justify-content: space-between;
font-size: 1.25em;
margin: 0;

}

.bottom-line {
  font-size: 1em;
  text-align: right;
  margin: 0;
}

p {
  margin: 0
}

</style>
