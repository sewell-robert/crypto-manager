// import Axios from 'axios'
const axios = require('axios')

const RESOURCE_NAME = 'https://localhost:44300/api/PerformanceSnapshot'
// const RESOURCE_NAME = 'https://cryptovue.azurewebsites.net/api/PerformanceSnapshot'

export default {
  getSnapshotObject (formData, config) {
    return axios.post(RESOURCE_NAME, formData, config)
  }
}