<template>
    <div>
        <p>Test 2</p>
        <p>{{ isSuccessful }}</p>
    </div>
</template>

<script>
import CreateRecordService from '@/api-services/CreateRecord.Service'

export default {
  name: 'CreateRecord',
  methods: {
    created () {
        const formData = new FormData()
        formData.append('userID', "rsewell")
        formData.append('assetID', "Front")
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
  },
  data () {
    return {
      isSuccessful: false,
    }
  }
}
</script>

<style scoped>

</style>
