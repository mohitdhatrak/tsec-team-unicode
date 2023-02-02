const NodeGeoCoder=require('node-geocoder')
var options={
    provider:'mapquest',
    httpAdapter:'https',
    apiKey:'iafUd3hVTZW6XvicVgbG2y7s29mHvN1S',
    formatter:null
}
const geocoder=NodeGeoCoder(options)
module.exports=geocoder