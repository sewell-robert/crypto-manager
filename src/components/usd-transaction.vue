<template>
  <div class="ml-2 mr-2">
    <v-text-field
        v-model="amountUSD"
        label="Amount (USD)"
        placeholder="Ex. 532.00 or 10000"
        @keyup="calculateQuantity()"
        class="mt-4"
    ></v-text-field>
    <v-text-field
        v-model="averagePrice"
        label="Average Price (USD)"
        placeholder="Ex. 100 or 1.653"
        @keyup="calculateQuantity()"
    ></v-text-field>
    <p class="mt-3">Quantity: {{ this.quantity }}</p>
    <v-text-field
        v-model="cryptoExchange"
        label="Exchange (optional)"
    ></v-text-field>

    <v-btn
        dark
        color="#FF4365"
        elevation="2"
        v-on:click="submitForm('Sold')"
        :loading="isLoading"
        class="mr-2"
    >
      Sold
    </v-btn>
    <v-btn
        dark
        color="#35ce8d"
        elevation="2"
        v-on:click="submitForm('Bought')"
        :loading="isLoading"
    >
      Bought
    </v-btn>

    <p v-if="isFormIncomplete" class="errorMessage">{{ this.errorMessage }}</p>

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

  export default {
    components: {  },
    name: 'usd-transaction',
    props: ['coinName', 'symbol'],
    methods: {
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
            this.$emit('loadInvestments');
          }
        });
      }
    },
    data () {
      return {
        amountUSD: '',
        averagePrice: '',
        quantity: 0,
        cryptoExchange: '',
        errorMessage: '',
        isFormIncomplete: false,
        isTrxComplete: false,
        isLoading: false,
        investments: Array
      }
    }
  }
</script>

<style scoped>
  .errorMessage {
      color: red;
  }
</style>