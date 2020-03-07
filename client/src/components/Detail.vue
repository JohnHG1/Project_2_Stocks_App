<template>
  <div class="detail">
    <h1>Detail Box</h1>
    <button type="button" @click="formatChartData">run formatter</button>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['detailStock'],
  data() {
    return {
      chartData: []
    }
  },
  methods: {
    formatChartData: function () {
      for (const key of Object.keys(this.detailStock)) {
        this.chartData.push([key, this.detailStock[key]['4. close']])
      }
      console.log(this.chartData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.detail {
  width: 75%;
  height: 700px;
  background-color: lightgrey;
  margin: 0 auto;
  padding: 0;
}

h1 {
  margin: 0;
}

</style>
