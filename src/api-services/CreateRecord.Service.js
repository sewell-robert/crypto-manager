// import Axios from 'axios'
const axios = require('axios')

const RESOURCE_NAME = 'https://localhost:44300/api/existinginvestment'
// const RESOURCE_NAME = 'https://photocontestapi2.azurewebsites.net/api/uploadphotos'

export default {
  createRecord (formData, config) {
    return axios.post(RESOURCE_NAME, formData, config)
  }
}
