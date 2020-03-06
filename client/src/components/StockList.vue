<template lang="html">
  <stock-item/>
</template>

<script>
import StockItem from './StockItem.vue'

export default {
  name: 'stock-list',
  components: {
    'stock-item': StockItem
}
}
</script>

<style lang="css" scoped>
</style>
