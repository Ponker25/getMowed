console.log ("starting")

var apiKey = "&api_key=C1609E9E-F9B9-41A6-B33B-DBBF74943CBB";

    var airQuality = $(this).attr("data-air");
    var imageType = $(this).text();
    var queryURL = "https//www.airnowapi.org/aq/forecast/zipCode/?format=text/csv&zipCode=84106&date=2018-06-07&distance=25&API_KEY=C1609E9E-F9B9-41A6-B33B-DBBF74943CBB";
 
  
  // function for pulling air quality when button is clicked
  $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        console.log(response);

    })