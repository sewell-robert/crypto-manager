<template>
  <div>
    
  </div>
</template>

<script>
import UserService from '@/api-services/User.Service'

export default {
  name: 'UserRegistration',
  methods: {
    registerUser () {
        console.log("it works");

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

        UserService.registerUser(formData, config).then(response => {
        this.isSuccessful = response.data.isSuccessful;
        })
    }
  }
}
</script>

<style>

</style>