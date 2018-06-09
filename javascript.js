// $(document).ready(function() {
//     var config = {
//         apiKey: "AIzaSyAhVU1YP3GROwJdtg1mbXTPIcpuyHEo0TQ",
//         authDomain: "getmowed-f3c1b.firebaseapp.com",
//         databaseURL: "https://getmowed-f3c1b.firebaseio.com",
//         projectId: "getmowed-f3c1b",
//         storageBucket: "getmowed-f3c1b.appspot.com",
//         messagingSenderId: "1002486779542"
//       };
//       firebase.initializeApp(config);

//       var inputCity = $(".form-control").val().trim();
//       var database = firebase.database();
//       var city = "";
//       var cloudy = "";
//       var humidity = "";
//       var temperature = "";
//       var hiTemp = "";
//       var lowTemp = "";
//       var windAngle = "";
//       var windSpeed = "";

//       function setUserInfo() {
//         //need a submitButton  
//         $("#submitButton").on("click", function(event) {
//             event.preventDefault();
//             compileWeather();
//             retrieveData();


//         });
//       }

//       function compileWeather() {            
//         var APIKey = "&appid=cb22e0a2f90f3ba4d3f4efb8f11a8410";
//         var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "London,uk" + APIKey;

//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//             city = response.name;
//             cloudy = response.weather[0].description;
//             humidity = response.main.humidity;
//             temperature = response.main.temp;
//             hiTemp = response.main.temp_max;
//             lowTemp = response.main.temp_min;
//             windAngle = response.wind.deg;
//             windSpeed = response.wind.speed;
            
//             database.ref().push({
//                 city: city,
//                 cloudy: cloudy,
//                 humidity: humidity,
//                 temp: temperature,
//                 hi: hiTemp,
//                 low: lowTemp,
//                 windAngle: windAngle,
//                 windSpeed: windSpeed
//             });
//         });
//     }

//     function retrieveData() {
//         database.ref().on("child_added", function(snapshot) {
//             $("#tableBody").append("<tr><td>" + snapshot.val().city + 
//                 "</td><td>" + snapshot.val().temp +
//                 "</td><td>" + snapshot.val().humidity +
//                 "</td><td>" + snapshot.val().cloudy +
//                 "</td><td>" + snapshot.val().windAngle +
//                 "</td><td>" + snapshot.val().windSpeed +
//                 "</td><td>" + snapshot.val().hi +
//                 "</td><td>" + snapshot.val().low +
//                 "</td></tr>"
//             );
//         });
//     }

//     setUserInfo();
//     // compileWeather();
//     // retrieveData();
// });