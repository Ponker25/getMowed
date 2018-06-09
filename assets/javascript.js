$(document).ready(function() {
  var config = {
      apiKey: "AIzaSyAhVU1YP3GROwJdtg1mbXTPIcpuyHEo0TQ",
      authDomain: "getmowed-f3c1b.firebaseapp.com",
      databaseURL: "https://getmowed-f3c1b.firebaseio.com",
      projectId: "getmowed-f3c1b",
      storageBucket: "getmowed-f3c1b.appspot.com",
      messagingSenderId: "1002486779542"
    };
    firebase.initializeApp(config);

    var inputCity = $(".form-control").val().trim();
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
      $("#submitButton").on("click", function(event) {
          event.preventDefault();
          compileWeather();
          retrieveData();
          alert("test");

      });
    }

    function compileWeather() {            
      var APIKey = "&appid=cb22e0a2f90f3ba4d3f4efb8f11a8410";
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "London,uk" + APIKey;

      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {
          console.log(response);
          city = response.name;
          cloudy = response.weather[0].description;
          humidity = response.main.humidity;
          temperature = response.main.temp;
          hiTemp = response.main.temp_max;
          lowTemp = response.main.temp_min;
          windAngle = response.wind.deg;
          windSpeed = response.wind.speed;
          
          database.ref().push({
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

  function retrieveData() {
      database.ref().on("child_added", function(snapshot) {
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
  // compileWeather();
  // retrieveData();
  console.log ("starting");
  
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
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});
