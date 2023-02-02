const axios = require('axios');

const algorithim = (nameOfProduct,ageOfProduct,conditionOfProduct) =>{
const params = {
  api_key: "2595D4081F1B4E39AAD408E6AAF2CCE5",
  type: "search",
  search_term: nameOfProduct,
  amazon_domain: "amazon.com"
}

var rawCost
axios.get('https://api.asindataapi.com/request', { params })
  .then(response => {
    rawCost = response.data.search_results[0].price.value
    console.log(rawCost)
  }).catch(error => {
    console.log(error);
})

var x = 82.06* rawCost;

if(ageOfProduct==1){
    x=x-0.01*x
}
if(ageOfProduct==2){
    x=x-0.02*x
}
if(ageOfProduct==3){
    x=x-0.03*x
}
if(ageOfProduct==4){
    x=x-0.04*x
}
if(ageOfProduct==5){
    x=x-0.05*x
}
if(ageOfProduct==7){
    x=x-0.07*x
}
if(ageOfProduct==6){
    x=x-0.06*x
}
if(ageOfProduct==8){
    x=x-0.10*x
}
if(ageOfProduct=10){
    x=x-0.12*x
}
if(ageOfProduct==11){
    x=x-0.14*x
}

if(conditionOfProduct=="Flawless"){
x=x-0.02*x
}
if(conditionOfProduct=="Good"){
x=x-0.1*x
}
if(conditionOfProduct=="Mediocre"){
x=x-0.3*x
}
if(conditionOfProduct=="Below"){
x=x-0.5*x
}

return x;

}


