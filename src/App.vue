<template>
  <div>
    <p>Test 1</p>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import CreateRecordService from '@/api-services/CreateRecord.Service'

export default {
  name: 'App',
  created () {
    console.log("created App");

    const formData = new FormData()
        formData.append('userID', "rsewell")
        formData.append('assetID', "Ada")
        formData.append('amountUSD', "1000")
        formData.append('quantity', "50")
        formData.append('averagePrice', "5")

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        CreateRecordService.createRecord(formData, config).then(response => {
        this.isSuccessful = response.data.isSuccessful;
        })
  }
}
</script>

<style>
#app {
  color: gray;
}
</style>