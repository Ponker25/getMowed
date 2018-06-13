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
    var APIKey = "&appid=cb22e0a2f90f3ba4d3f4efb8f11a8410";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      date = moment().format('LL');
      time = moment().format('LT')
      city = response.name;
      cloudy = response.weather[0].description;
      humidity = response.main.humidity;
      temperature = Math.round(9 / 5 * (response.main.temp - 273) + 32);
      hiTemp = Math.round(9 / 5 * (response.main.temp_max - 273) + 32);
      lowTemp = Math.round(9 / 5 * (response.main.temp_min - 273) + 32);
      windAngle = response.wind.deg;
      windSpeed = response.wind.speed;
      

      database.ref("/weather").push({
        date: date,
        time: time,
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
  }
  function retrieveWeather() {
    database.ref("/weather").on("child_added", function (snapshot) {
      console.log(snapshot.val());
      $("#tableBody").append("<tr><td>" + snapshot.val().date +
        "</td><td>" + snapshot.val().time +
        "</td><td>" + snapshot.val().city +
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
    // additional variable inforation to flood latitude and longitude.
    "url": "https://api.breezometer.com/baqi/?lat=40.7324296&lon=-73.9977264&key=e4417ac440f444eb8397e28bcb3fc5c5",
    "method": "GET",
    // "headers": {
    //   "Cache-Control": "no-cache",
    //   "Postman-Token": "1d63ebfc-0c70-4f76-ad2e-88c75e87c36c"
    // }
  };
  function aqiIndex() {
    $.ajax(settings).done(function (response) {
      console.log(response);
      inputCity = $(".form-control").val().trim();
      date = moment().format('LL');
      time = moment().format('LT');
      airQuality = response.breezometer_aqi;
      airColor = response.breezometer_color;
      index = response.breezometer_description;
      recommendations = response.random_recommendations.health;
      
            console.log(inputCity);
            console.log(date);
            console.log(time);
            console.log(airQuality);
            console.log(airColor);
            console.log(index);
            console.log(recommendations);

                if (airColor === "#009E3A") {
                  airColor === "pillshape";
                } else if (airColor === "#58BE35") {
                  airColor === "circle";
                } else if (airColor === "#C1E619") {
                  airColor === "diamond";
                } else if (airColor === "#FEC500") {
                  airColor === "triangle";
                } else if (airColor === "#FE4600") {
                  airColor === "square";
                } else if (airColor === "#800000") {
                  airColor === "hexagon";
                }

      database.ref("/aqiInfo").push({
        inputCity: inputCity,
        date: date,
        time: time,
        airQuality: airQuality,
        airColor: airColor,
        index: index,
        recommendations: recommendations
      });
    });
  }
  function getAirQualityData() {
    database.ref("/aqiInfo").on("child_added", function (snapshot) {
      $("#aqiTable").append("<tr><td>" + snapshot.val().date +
        "</td><td>" + snapshot.val().time + 
        "</td><td>" + snapshot.val().inputCity +
        "</td><td>" + snapshot.val().airQuality +
        "</td><td data-color =" + snapshot.val().airColor + ">" +
        "</td><td>" + snapshot.val().index +
        "</td><td>" + snapshot.val().recommendations +
        "</td></tr>"
      );
    });
  }
