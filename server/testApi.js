const axios = require('axios');

const costAlgorithm = () =>{
const params = {
  api_key: "2595D4081F1B4E39AAD408E6AAF2CCE5",
  type: "search",
  search_term: "children toys",
  amazon_domain: "amazon.com"
}

axios.get('https://api.asindataapi.com/request', { params })
  .then(response => {
    rawCost = response.data.search_results[0].price.value
    console.log(rawCost)
  }).catch(error => {
    console.log(error);
})



}
costAlgorithm()



