console.log ("starting")

var aqiLat = $("#cityInputLat").text();
var aqiLong = $("#cityInputLong").text();

// var date = moment.js() ;
var apiKey = "&API_KEY=C1609E9E-F9B9-41A6-B33B-DBBF74943CBB";

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.breezometer.com/baqi/?lat=40.7324296&lon=-73.9977264&key=e4417ac440f444eb8397e28bcb3fc5c5",
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache",
    "Postman-Token": "1d63ebfc-0c70-4f76-ad2e-88c75e87c36c"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});