<template lang="html">
  <div class="stock-item">
    <div class="top-line">
      <span>{{stock['stock_symbol']}}</span>
      <span>${{numberWithCommas(parseFloat(stock['number_of_shares'] * stock['price']).toFixed(2))}}</span>
    </div>
    <div class="bottom-line">
      <p>{{stock.number_of_shares}} @ ${{stock.price}}</p>
    </div>
    <hr>

  </div>
</template>

<script>
export default {
  name: 'stockItem',
  props: ['stock'],
  methods:{
  numberWithCommas: function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>

<style lang="css" scoped>
.stock-item {
  width: 100%;
  display: block;
}
.stock-item:hover {
  /* background-color: darkgray; */
  color: #f2f2f2;
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
}

p {
  margin: 0
}

</style>
