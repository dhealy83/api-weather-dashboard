var APIkey = "7bf7f64189595f977e6ba12b82dac79d";
var citySearch = document.getElementById("input");
var buttonAction = document.querySelector(".btn");
// var weatherNowTemp = document.getElementById("weatherNowTemp");
var dateEl = document.getElementById("date");
var temp = document.getElementById("weatherNowTemp");
var rh = document.getElementById("weatherNowRH");
var ws = document.getElementById("weatherNowWS");
var uv = document.getElementById("weatherNowUV");
var dateCall = new Date();
var searchHistory = document.querySelector("#prevSearch");
// console.log(dateCall);

// console.log(buttonAction);

const getWeatherData = function (event) {
  var myCityValue = citySearch.value || event.target.innerHTML;
  // if citysearch.value doesnt exist find the value from event
  console.log(myCityValue);
  var savedCities = JSON.parse(localStorage.getItem("cities")) ?? [];
  console.log(savedCities);
  if (!savedCities.includes(citySearch.value)) {
    var updatedCities = [...savedCities, citySearch.value];
    localStorage.setItem("cities", JSON.stringify(updatedCities));
  }
  var queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    myCityValue +
    "&appid=" +
    APIkey +
    "&units=imperial";
  citySearch.value;
  fetch(queryURL)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);

      var queryURL002 =
        "https://api.openweathermap.org/data/3.0/onecall?lat=" +
        data[0].lat +
        "&lon=" +
        data[0].lon +
        "&appid=" +
        APIkey +
        "&units=imperial";
      fetch(queryURL002)
        .then(function (data) {
          return data.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(queryURL002);

          // temp = data.current.temp;
          // console.log(Math.round(temp));
          // rh = data.current.humidity;
          // console.log(rh);
          // ws = data.current.wind_speed;
          // console.log(ws);
          // uv = data.current.uvi;
          // console.log(uv);

          var date = document.createElement("h1");
          dateEl.textContent = "";
          date.textContent = myCityValue.toUpperCase() + " " + dateCall;
          dateEl.appendChild(date);

          console.log(citySearch.value);

          var temp01 = document.createElement("h3");
          temp.textContent = "";
          temp01.textContent = "Temp:" + data.current.temp;
          weatherNowTemp.appendChild(temp01);

          var rh01 = document.createElement("h3");
          rh.textContent = "";
          rh01.textContent = "Relative Humidity:" + data.current.humidity;
          weatherNowRH.appendChild(rh01);

          var ws01 = document.createElement("h3");
          ws.textContent = "";
          ws01.textContent = "Wind Speed:" + data.current.wind_speed;
          weatherNowWS.appendChild(ws01);

          var uv01 = document.createElement("h3");
          uv.textContent = "";
          uv01.textContent = "UV Index:" + data.current.uvi;
          weatherNowUV.appendChild(uv01);
        });
      // weatherNowTemp.empty()
    });
};

function renderSearchHistory() {
  var savedCities = JSON.parse(localStorage.getItem("cities")) ?? [];
  if (savedCities.length < 1) {
    return;
  }
  for (let index = 0; index < savedCities.length; index++) {
    var searchItem = document.createElement("li");
    var searchButton = document.createElement("button");
    searchButton.textContent = savedCities[index];
    searchButton.addEventListener("click", function (event) {
      getWeatherData(event);
    });
    searchItem.appendChild(searchButton);
    searchHistory.appendChild(searchItem);
  }
}

renderSearchHistory();

buttonAction.addEventListener("click", getWeatherData);

// the temperature, the humidity, the wind speed, and the UV index
