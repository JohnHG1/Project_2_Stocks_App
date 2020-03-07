<template>
  <div class="detail">
    <h1>Detail Box</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
