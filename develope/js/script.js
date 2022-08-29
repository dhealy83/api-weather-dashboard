var APIkey = "7bf7f64189595f977e6ba12b82dac79d";
var citySearch = document.querySelector("#inputSearch");
var buttonAction = document.querySelector(".btn");
// var weatherNowTemp = document.getElementById("weatherNowTemp");
var dateEl = document.getElementById("date");
var temp = document.getElementById("weatherNowTemp");
var rh = document.getElementById("weatherNowRH");
var ws = document.getElementById("weatherNowWS");
var uv = document.getElementById("weatherNowUV");
var dateCall = Date.now.toLocaleString();

// console.log(dateCall);
var searchHistory = document.querySelector("#prevSearch");
// console.log(dateCall);

// console.log(buttonAction);

function images() {}

function fiveDay(data, container) {
  this.data = data;
  this.container = container;
  this.container.innerHTML = "";

  this.render = function () {
    var loopDay = document.createElement("p");
    var loopTemp = document.createElement("p");
    var loopRh = document.createElement("p");
    var loopWs = document.createElement("p");
    var loopUv = document.createElement("p");
    loopDay.textContent = dateCall;
    console.log(loopDay.textContent);
    console.log(this.data.dt.toLocaleString("DD-MM"));
    loopTemp.textContent = loopTemp.textContent = "Temp: " + this.data.temp.day;
    loopRh.textContent = "Humidity: " + this.data.humidity;
    loopWs.textContent = "Wind Speed: " + this.data.wind_speed;
    loopUv.textContent = "UV Index: " + this.data.uvi;
    this.container.append(loopDay, loopTemp, loopRh, loopWs, loopUv);
  };
}

const getWeatherData = function (event) {
  var myCityValue = citySearch.value.trim() || event.target.innerHTML;
  var savedCities = JSON.parse(localStorage.getItem("cities")) ?? [];
  console.log(savedCities);
  if (citySearch.value === "") {
    return;
  }
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

          for (let index = 0; index < 5; index++) {
            var dailyPull = new fiveDay(
              data.daily[index],
              document.getElementById("day" + (index + 1))
            );
            dailyPull.render();
          }
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
      citySearch.value = savedCities[index];
      getWeatherData(event);
    });
    searchItem.appendChild(searchButton);
    searchHistory.appendChild(searchItem);
  }
}

renderSearchHistory();

buttonAction.addEventListener("click", getWeatherData);

// the temperature, the humidity, the wind speed, and the UV index
