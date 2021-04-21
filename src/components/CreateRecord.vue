<template>
    <div>
      <v-container>
        <center><h3>Add Transaction</h3></center>
        <!-- <v-input type="text" v-on:change="getCoinId()" v-model="txtInput"></v-input><br /> -->
        <v-text-field
          label="Main input"
          hide-details="auto"
          v-on:change="getCoinId(txtInput)"
          v-model="txtInput"
        ></v-text-field><br />
        <div v-if="isSuccessful">
          <p>We found <strong>{{ coinName }}</strong>. Would you like to continue?</p>
        </div>
      </v-container>
    </div>
</template>

<script>
// import CreateRecordService from '@/api-services/CreateRecord.Service'
import CoinSearchService from '@/api-services/CoinSearch.Service'

export default {
  name: 'CreateRecord',
  created () {
        // console.log("created");

        // const formData = new FormData()
        // formData.append('userID', "rsewell")
        // formData.append('assetID', "Front")
        // formData.append('amountUSD', "1000")
        // formData.append('quantity', "50")
        // formData.append('averagePrice', "5")

        // const config = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }

        // CreateRecordService.createRecord(formData, config).then(response => {
        // this.isSuccessful = response.data.isSuccessful;
        // })
    },
  methods: {
    createRecord () {
        console.log("it works");
    },
    getCoinId (txtInput) {
      this.isSuccessful = false;
      
      CoinSearchService.getCoinList().then(response => {
        var coins = response.data;

        // The view model.
        var vm = this;

        coins.forEach(function(coin) {
          if (coin.name.toLowerCase() == txtInput) {
            console.log(coin.name.toLowerCase());
            vm.coinName = coin.name;
            vm.isSuccessful = true;
          }
        });
      })
    }
  },
  data () {
    return {
      isSuccessful: false,
      txtInput: '',
      coinName: ''
    }
  }
}
</script>

<style scoped>

</style>
