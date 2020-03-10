<template lang="html">
  <div class="portfolio">
    <h1>Total: ${{numberWithCommas(this.portfolioTotal.toFixed(2))}}</h1>
  </div>

</template>

<script>
export default {
  name:'portfolioSummary',
  props:['userStocks'],
  methods: {
    numberWithCommas: function (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
  },
  computed:{
    portfolioTotal(){
      return this.userStocks.reduce((runningTotal, stock) => runningTotal + stock.price * stock.number_of_shares, 0)
    //   let total=0
    //   this.userStocks.forEach(stock=>{
    //     total+=stock.price*stock.number_of_shares
    //   })
    //   return total
    }
  }
}
</script>

<style lang="css" scoped>

.portfolio {
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  margin: 0;
  text-align: right;
  height: 40px;
  background-color: lightgrey;
  padding: 15px 0;
}
h1 {
  margin: auto 10px;
}

</style>
