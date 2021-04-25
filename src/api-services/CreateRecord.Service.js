// import Axios from 'axios'
const axios = require('axios')

// const RESOURCE_NAME = 'https://localhost:44300/api/ExistingInvestment'
const RESOURCE_NAME = 'https://cryptovue.azurewebsites.net/api/ExistingInvestment'

export default {
  createRecord (formData, config) {
    return axios.post(RESOURCE_NAME, formData, config)
  }
}
