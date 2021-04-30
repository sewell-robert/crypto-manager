// import Axios from 'axios'
const axios = require('axios')

// const RESOURCE_NAME = 'https://localhost:44300/api/ExistingInvestment'
const RESOURCE_NAME = 'https://cryptovue.azurewebsites.net/api/ExistingInvestment'

export default {
  createRecord (formData, config) {
    return axios.post(RESOURCE_NAME, formData, config)
  },
  getRecords (username) {
    return axios.get(RESOURCE_NAME + "/" + username)
  },
  updateRecord (formData, config) {
    return axios.post(RESOURCE_NAME, formData, config)
  },
  deleteRecord (id) {
    return axios.delete(RESOURCE_NAME + "/" + id)
  }
}
