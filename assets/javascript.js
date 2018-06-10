var config = {
  apiKey: "AIzaSyAhVU1YP3GROwJdtg1mbXTPIcpuyHEo0TQ",
  authDomain: "getmowed-f3c1b.firebaseapp.com",
  databaseURL: "https://getmowed-f3c1b.firebaseio.com",
  projectId: "getmowed-f3c1b",
  storageBucket: "getmowed-f3c1b.appspot.com",
  messagingSenderId: "1002486779542"
};

var configTwo = {
  apiKey: "AIzaSyAhVU1YP3GROwJdtg1mbXTPIcpuyHEo0TQ",
  authDomain: "airquality-f3c1b-8457f.firebaseapp.com",
  databaseURL: "https://airquality-f3c1b-8457f.firebaseio.com/",
  projectId: "airquality-f3c1b-8457f",
  storageBucket: "airquality-f3c1b.appspot.com",
  messagingSenderId: "1002486779542"
};

firebase.initializeApp(config, configTwo);
var inputCity = "";
var database = firebase.database();
var city = "";
var cloudy = "";
var humidity = "";
var temperature = "";
var hiTemp = "";
var lowTemp = "";
var windAngle = "";
var windSpeed = "";
var date = "";





function setUserInfo() {
  //need a submitButton  
  $("#submitButton").on("click", function (event) {
    event.preventDefault();
    $("#tableBody").empty();
    $("#aqiTable").empty();
    compileWeather();
    retrieveWeather();
    aqiIndex();
    getAirQualityData();

  });
}


function compileWeather() {
  inputCity = $(".form-control").val().trim();
  inputCity = inputCity.replace(/\s+/g, '+');
  var APIKeyOne = "&appid=cb22e0a2f90f3ba4d3f4efb8f11a8410";
  var queryURLOne = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + APIKeyOne;

  $.ajax({
    url: queryURLOne,
    method: "GET"
  }).then(function (response) {


    city = response.name;
    cloudy = response.weather[0].description;
    humidity = response.main.humidity;
    temperature = Math.round(9 / 5 * (response.main.temp - 273) + 32);
    hiTemp = Math.round(9 / 5 * (response.main.temp_max - 273) + 32);
    lowTemp = Math.round(9 / 5 * (response.main.temp_min - 273) + 32);
    windAngle = response.wind.deg;
    windSpeed = response.wind.speed;

    database.ref("/weather").push({
      city: city,
      cloudy: cloudy,
      humidity: humidity,
      temp: temperature,
      hi: hiTemp,
      low: lowTemp,
      windAngle: windAngle,
      windSpeed: windSpeed
    });


  });
  var APIKeyTwo = "&appid=cb22e0a2f90f3ba4d3f4efb8f11a8410";
  var queryURLTwo = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + APIKeyTwo;

  $.ajax({
    url: queryURLTwo,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    city = response.city.name;
    var cloudyArray = [];
    for (var i = 0; i < 40; i++) {
     var cloudy = response.list[i].weather[0].description;
     if (i % 8 === 0) {
       cloudyArray.push(cloudy);
     }
    }  
    console.log(cloudyArray);
    var dateArray = [];
    for (var j = 0; j < 40; j++) {
      var originalDate = (response.list[j].dt_txt);
      if (j % 8 === 0) {
        var printDate = originalDate.substr(5).slice(0, -9);
        dateArray.push(printDate);
      }
    }

    console.log(dateArray);
  });
}

function retrieveWeather() {
  database.ref("/weather").on("child_added", function (snapshot) {
    // console.log(snapshot.val());
    $("#tableBody").append("<tr><td>" + snapshot.val().city +
      "</td><td>" + snapshot.val().temp +
      "</td><td>" + snapshot.val().humidity +
      "</td><td>" + snapshot.val().cloudy +
      "</td><td>" + snapshot.val().windAngle +
      "</td><td>" + snapshot.val().windSpeed +
      "</td><td>" + snapshot.val().hi +
      "</td><td>" + snapshot.val().low +
      "</td></tr>"
    );
  });
}

setUserInfo();

var dateTime = "";
var airQuality = "";
var color = "";
var recommendations = "";
//   function compileAirQuality();
var qualityLat = $("#cityInputLat").text();
var qualityLong = $("#cityInputLong").text();
var apiKey = "e4417ac440f444eb8397e28bcb3fc5c5";

var settings = {
  // "async": true,
  // "crossDomain": true,
  "url": "https://api.breezometer.com/baqi/?lat=40.7324296&lon=-73.9977264&key=e4417ac440f444eb8397e28bcb3fc5c5",
  "method": "GET",
  // "headers": {
  //   "Cache-Control": "no-cache",
  //   "Postman-Token": "1d63ebfc-0c70-4f76-ad2e-88c75e87c36c"
  // }
};

function aqiIndex() {
  $.ajax(settings).done(function (response) {
    // console.log(response);
    date = moment().format('LL');
    time = moment().format('LT');
    dateTime = response.datetime;
    airQuality = response.breezometer_aqi;
    airColor = response.breezometer_color;
    index = response.breezometer_description;
    recommendations = response.random_recommendations.health;
    // console.log(dateTime);
    // console.log(airQuality);
    // console.log(airColor);
    // console.log(index);
    // console.log(recommendations);


    database.ref("/aqiInfo").push({
      date: date,
      time: time,
      dateTime: dateTime,
      airQuality: airQuality,
      airColor: airColor,
      index: index,
      recommendations: recommendations
    });
  });
}

function getAirQualityData() {
  database.ref("/aqiInfo").on("child_added", function (snapshot) {
    $("#aqiTable").append("<tr><td>" + snapshot.val().dateTime +
      "</td><td>" + snapshot.val().airQuality +
      "</td><td>" + snapshot.val().airColor +
      "</td><td>" + snapshot.val().index +
      "</td><td>" + snapshot.val().recommendations +
      "</td></tr>"
    );
  });
}