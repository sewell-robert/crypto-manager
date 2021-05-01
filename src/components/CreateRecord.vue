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
        <v-text-field
          v-model="amountUSD"
          label="Amount (USD)"
          placeholder="Ex. 532.00 or 10000"
          @keyup="calculateQuantity()"
        ></v-text-field>
        <v-text-field
          v-model="averagePrice"
          label="Average Price (USD)"
          placeholder="Ex. 100 or 1.653"
          @keyup="calculateQuantity()"
        ></v-text-field>
        <p>Quantity: {{ this.quantity }}</p>
        <v-text-field
          v-model="cryptoExchange"
          label="Exchange (optional)"
        ></v-text-field>

        <v-btn
          color="error"
          elevation="2"
          v-on:click="submitForm('Sold')"
          :loading="isLoading"
          class="mr-2"
        >
          Sold
        </v-btn>
        <v-btn
          color="success"
          elevation="2"
          v-on:click="submitForm('Bought')"
          :loading="isLoading"
        >
          Bought
        </v-btn>
        <p v-if="isFormIncomplete" class="errorMessage">{{ this.errorMessage }}</p>
      </div>
    </v-container>

    <v-spacer></v-spacer>

    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Date
              </th>
              <th class="text-left">
                Symbol
              </th>
              <th class="text-left">
                USD
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in investments"
              :key="item.name"
            >
              <td>{{ item.entryDt }}</td>
              <td>{{ item.assetSym }}</td>
              <td>{{ item.amountUSD }}</td>
              <td>
                <v-btn
                  icon
                  tile
                  color="secondary"
                  elevation="2"
                  v-on:click="deleteRecord(item.id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>

    <br /><br /><br />

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
  created () {
    this.loadInvestments();
  },
  methods: {
    loadInvestments () {
      CreateRecordService.getRecords(localStorage.getItem('username')).then(response => {

        this.investments = response.data;
      });
    },
    deleteRecord (id) {
        CreateRecordService.deleteRecord(id).then(response => {
          if (response.data == true) {
            this.loadInvestments();
          }
        })
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
    submitForm (transactionType) {
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
        formData.append('transactionType', transactionType)
        formData.append('cryptoExchange', this.cryptoExchange)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        CreateRecordService.createRecord(formData, config).then(response => {
          this.isTrxComplete = response.data;
          this.isLoading = false;

          if (this.isTrxComplete) {
            this.loadInvestments();
          }
        })
    },
    calculateQuantity() {
      if (this.amountUSD == '' || this.averagePrice == '') {
        this.quantity = 0;
        return;
      }
      else {
        var amount = parseFloat(this.amountUSD);
        var price = parseFloat(this.averagePrice);
        this.quantity = (amount / price).toFixed(2);
      }
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
      quantity: 0,
      cryptoExchange: '',
      username: '',
      isTrxComplete: false,
      isLoading: false,
      isFormIncomplete: false,
      errorMessage: '',
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
  .errorMessage {
    color: red;
  }
</style>
