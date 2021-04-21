const axios = require('axios')

const RESOURCE_NAME = 'https://api.coingecko.com/api/v3/coins/list'

export default {
  getCoinList () {
    return axios.get(RESOURCE_NAME);
  }
}