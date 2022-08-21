var APIkey = "7bf7f64189595f977e6ba12b82dac79d";
var citySearch = document.getElementById("input");
var buttonAction = document.querySelector(".btn") ;
var dateEl = document.getElementById("date");
// var weatherNowTemp = document.getElementById("weatherNowTemp");
var temp;
var rh;
var ws;
var uv;
var dateCall = new Date();
console.log(dateCall);

// console.log(buttonAction);

buttonAction.addEventListener("click", function(event){
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + citySearch.value + "&appid=" + APIkey + "&units=imperial";
    citySearch.value
    fetch(queryURL).then(function(data){
        return data.json();
    }).then(function(data){
        console.log(data[0].lat, data[0].lon);
        
        var queryURL002 = "https://api.openweathermap.org/data/3.0/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + APIkey + "&units=imperial";
        fetch(queryURL002).then(function(data){
            return data.json();
        }).then(function(data){
            console.log(data)
            console.log(queryURL002);
            
            temp = (data.current.temp);
            console.log(Math.round(temp));
            rh = (data.current.humidity);
            console.log(rh);
            ws = (data.current.wind_speed);
            console.log(ws);
            uv = (data.current.uvi);
            console.log(uv);
            
            var date = document.createElement("h1")
            date.textContent = citySearch.value.toUpperCase() + " " +  dateCall 
            dateEl.appendChild(date)

            console.log(citySearch.value);

        var temp01 = document.createElement("h3")
        temp01.textContent = data.current.temp;
        weatherNowTemp.appendChild(temp01)
        
        var rh01 = document.createElement("h3")
        rh01.textContent = data.current.humidity;
        weatherNowRH.appendChild(rh01)

        var ws01 = document.createElement("h3")
        ws01.textContent = data.current.wind_speed;
        weatherNowWS.appendChild(ws01)

        var uv01 = document.createElement("h3")
        uv01.textContent = data.current.uvi;
        weatherNowUV.appendChild(uv01)
        })
    })
})

// the temperature, the humidity, the wind speed, and the UV index