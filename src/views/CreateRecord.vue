<template>
  <div>
    <v-container>
      <center><h3>Add Transaction</h3></center><br />
      <v-text-field
        label="Type Asset Name"
        hide-details="auto"
        v-on:keyup="getCoinId(txtInput)"
        v-model="txtInput"
        solo
        outlined
        tile
      ></v-text-field>

      <div v-if="isTyping" class="results">
        <div v-if="isSuccessful">
          <v-radio-group v-model="isRadioBtnSelected">
            <v-radio
              :label="this.symbol + ' - ' + this.price + ' USD'"
              :value="true"
            ></v-radio>
          </v-radio-group>
        </div>
        <div v-else-if="isSearching">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div v-else>
          <p>Not Recognized: Try entering parent name</p>
        </div>
      </div>

      <div v-if="isRadioBtnSelected">
        <tabs :coinName="coinName" :symbol="symbol" @loadInvestments="loadInvestments()" />
      </div>
    </v-container>

    <v-container>
      <usd-transaction-table :investments="investments" @loadInvestments="loadInvestments()" />
    </v-container>
  </div>
</template>

<script>
import CreateRecordService from '@/api-services/CreateRecord.Service'
import CoinSearchService from '@/api-services/CoinSearch.Service'
import tabs from '../components/tabs.vue';
import usdTransactionTable from '../components/usd-transaction-table.vue'

export default {
  components: { tabs, usdTransactionTable },
  name: 'CreateRecord',
  created () {
    this.loadInvestments();
  },
  methods: {
    loadInvestments () {
      CreateRecordService.getRecords(localStorage.getItem('username')).then(response => {
        this.investments = response.data;
      });
    },
    getCoinId (txtInput) {
      this.isTyping = true;
      this.isSearching = true;
      this.isSuccessful = false;
      this.isRadioBtnSelected = false;
      
      CoinSearchService.getCoinList().then(response => {
        var coins = response.data;

        // The view model.
        var vm = this;

        coins.forEach(function(coin) {
          if (coin.name.toLowerCase() == txtInput.toLowerCase()) {
            CoinSearchService.getCurrentDataByCoinId(coin.id).then(results => {
              var result = results.data;

              vm.symbol = result.symbol.toUpperCase();
              vm.price = result.market_data.current_price.usd;

              vm.coinName = coin.name;
              vm.isSuccessful = true;
            })
          }
        });

        vm.isSearching =false;
      })
    }
  },
  data () {
    return {
      isTyping: false,
      isSearching: false,
      isSuccessful: false,
      txtInput: '',
      coinName: '',
      isRadioBtnSelected: false,
      symbol: '',
      price: '',
      investments: Array
    }
  }
}
</script>

<style scoped>
  .results {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
