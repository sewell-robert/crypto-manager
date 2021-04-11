<template>
  <div id="app">
    <p>Test 1</p>
    <create-record></create-record>
  </div>
</template>

<script>
import CreateRecord from './components/CreateRecord.vue'
export default {
  components: { CreateRecord },
  name: 'App'
}
</script>

<style>
#app {
  color: gray;
}
</style>