<template lang="html">
  <div class="stock-item">
    <span>{{stock['stock_symbol']}}</span>
    <span>{{stock['number_of_shares']}}</span>
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
border-bottom: 1px solid black;
}
</style>
