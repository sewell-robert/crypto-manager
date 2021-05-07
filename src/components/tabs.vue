<template>
  <v-card
    elevation="2"
    outlined
    tile
  >
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tabs-slider color="primary"></v-tabs-slider>

      <v-tab>
        USD/Stable Coin
      </v-tab>
      <v-tab>
        Coin Swaps
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <usd-transaction :coinName="coinName" :symbol="symbol" @loadInvestments="loadInvestments()" />
      </v-tab-item>
      <v-tab-item>
        <coinswap-transaction />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import usdTransaction from './usd-transaction.vue'
  import coinswapTransaction from './coinswap-transaction.vue'

  export default {
    components: { usdTransaction, coinswapTransaction },
    name: 'tabs',
    props: ['coinName', 'symbol'],
    methods: {
      loadInvestments () {
        this.$emit('loadInvestments')
      }
    },
    data () {
      return {
        tab: null
      }
    },
  }
</script>

<style scoped>

</style>