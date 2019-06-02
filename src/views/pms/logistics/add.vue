<template> 
  <logistics-detail :is-edit='false'></logistics-detail>
</template>
<script>
  import LogisticsDetail from './components/LogisticsDetail'
  export default {
    name: 'addLogistics',
    components: { LogisticsDetail }
  }
</script>
<style>
</style>


