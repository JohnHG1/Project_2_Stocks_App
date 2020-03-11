<template lang="html">
  <div class="stock-item">
    <div class="top-line">
      <span>{{stock['stock_symbol']}}</span>
      <span v-bind:class="isPositive ? 'positive':'negative'">${{numberWithCommas(parseFloat(stock['number_of_shares'] * stock['price']).toFixed(2))}}</span>
    </div>
    <div class="bottom-line">
      <p>{{stock.number_of_shares}} @ ${{stock.price}}</p>
    </div>

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
  },
  data(){
    return {
      isPositive: null
    }
  },
  mounted: {
    checkChange: function(){
      if(stock.change >= 0){
        return this.isPositive = true;
      } else {
        return this.isPositive = false;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.stock-item {
  width: 100%;
  display: block;
  border-bottom: 1px solid darkgrey;
  padding: 5px 0 0 0;
}
.stock-item:hover {
  /* background-color: darkgray; */
  color: #4CA3EF;
}

.top-line {
  display: flex;
justify-content: space-between;
font-size: 1.75em;
margin: 0;

}

.bottom-line {
  font-size: 1.2em;
  text-align: right;
}

p {
  margin: 0
}

.positive {
  color: green;
}
.negative {
  color: red;
}

</style>
