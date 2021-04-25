const axios = require('axios')

const RESOURCE_NAME = 'https://api.coingecko.com/api/v3/coins/'

export default {
  getCoinList () {
    return axios.get(RESOURCE_NAME + "list");
  },
  getCurrentDataByCoinId (coinId) {
    return axios.get(RESOURCE_NAME + coinId + "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
  }
}