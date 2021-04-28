<template>
  <div>
    <v-container>
      <center><h3>Add Investment</h3></center><br />
      <!-- <v-input type="text" v-on:change="getCoinId()" v-model="txtInput"></v-input><br /> -->
      <!-- <p>1. Enter asset's name</p> -->
      <v-text-field
        label="Type Asset Name"
        hide-details="auto"
        v-on:keyup="getCoinId(txtInput)"
        v-model="txtInput"
        solo
      ></v-text-field>

      <div v-if="isTyping" class="results">
        <div v-if="isSuccessful">
          <!-- <p>We found <strong>{{ coinName }}</strong>.</p><br /> -->

          <!-- <p>2. Select asset</p> -->
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
        <!-- <p>3. Complete form</p> -->
        <br />
        <p>Exclude commas and other symbols.</p>
        <v-text-field
          v-model="amountUSD"
          label="Amount Invested (USD)"
          placeholder="Ex. 532.00 or 10000"
        ></v-text-field>
        <v-text-field
          v-model="averagePrice"
          label="Average Price (USD)"
          placeholder="Ex. 100 or 1.653"
        ></v-text-field>

        <v-btn
          color="primary"
          elevation="2"
          v-on:click="submitForm()"
          :loading="isLoading"
        >
          Save
        </v-btn>
        <p v-if="isFormIncomplete" class="errorMessage">{{ this.errorMessage }}</p>
      </div>
    </v-container>

    <div class="text-center ma-2">
      <v-snackbar
        v-model="isTrxComplete"
      >
        <p>Transaction Saved</p>

        <template v-slot:action="{ attrs }">
          <v-btn
            color="primary"
            text
            timeout="20000"
            v-bind="attrs"
            @click="isTrxComplete = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import CreateRecordService from '@/api-services/CreateRecord.Service'
import CoinSearchService from '@/api-services/CoinSearch.Service'

export default {
  name: 'CreateRecord',
  methods: {
    createRecord () {
        console.log("it works");
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
    },
    submitForm () {
      if (this.amountUSD == '' || this.averagePrice == '') {
        this.isFormIncomplete = true;
        this.errorMessage = "Missing form values"

        return;
      }

      this.isFormIncomplete = false;
      this.isTyping = false;
      this.isLoading = true;

      this.username = localStorage.getItem('username');

      const formData = new FormData()
        formData.append('userID', this.username)
        formData.append('assetName', this.coinName)
        formData.append('assetSymbol', this.symbol)
        formData.append('amountUSD', this.amountUSD)
        formData.append('averagePrice', this.averagePrice)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        CreateRecordService.createRecord(formData, config).then(response => {
          this.isTrxComplete = response.data;
          this.isLoading = false;
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
      amountUSD: '',
      averagePrice: '',
      username: '',
      isTrxComplete: false,
      isLoading: false,
      isFormIncomplete: false,
      errorMessage: ''
    }
  }
}
</script>

<style scoped>
  .results {
    margin-top: 10px;
    margin-left: 10px;
  }
  .errorMessage {
    color: red;
  }
</style>
