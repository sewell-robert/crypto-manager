// import Axios from 'axios'
const axios = require('axios')

// const RESOURCE_NAME = 'https://localhost:44300/api/Authentication'
const RESOURCE_NAME = 'https://cryptovue.azurewebsites.net/api/Authentication'

export default {
  registerUser (formData, config) {
    return axios.post(RESOURCE_NAME + "/Register", formData, config)
  },
  loginUser (formData, config) {
    return axios.post(RESOURCE_NAME + "/Login", formData, config)
  }
}