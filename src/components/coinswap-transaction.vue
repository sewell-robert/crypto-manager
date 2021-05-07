<template>
  <div>
    <p class="mt-5 ml-7">Coming soon...</p>
  </div>
</template>

<script>
  export default {
    components: {  },
    name: 'coinswap-transaction',
    methods: {
      loadInvestments () {
        this.$emit('loadInvestments')
      }
    },
    data () {
      return {

      }
    },
  }
</script>

<style scoped>
  
</style>