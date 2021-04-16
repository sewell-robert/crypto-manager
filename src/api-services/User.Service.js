// import Axios from 'axios'
const axios = require('axios')

const RESOURCE_NAME = 'https://localhost:44300/api/Authentication'
// const RESOURCE_NAME = 'https://photocontestapi2.azurewebsites.net/api/uploadphotos'

export default {
  registerUser (formData, config) {
    return axios.post(RESOURCE_NAME, formData, config)
  }
}