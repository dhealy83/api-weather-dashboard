var APIkey = "7bf7f64189595f977e6ba12b82dac79d";
var citySearch = document.getElementById("input");
var buttonAction = document.querySelector(".btn") ;
var weatherNow = document.getElementById("weatherNow");
var temp;
var rh;
var ws;
var uv;

// console.log(buttonAction);

buttonAction.addEventListener("click", function(event){
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + citySearch.value + "&appid=" + APIkey;
    citySearch.value
    fetch(queryURL).then(function(data){
    return data.json();
}).then(function(data){
    console.log(data[0].lat, data[0].lon);
    
        var queryURL002 = "https://api.openweathermap.org/data/3.0/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + APIkey;
        fetch(queryURL002).then(function(data){
            return data.json();
        }).then(function(data){
        console.log(data)
            temp = 1.8*(data.current.temp-273) + 32;
            console.log(Math.round(temp))
            // rh = (data.current.humidity)
            // console.log(rh)
            // ws = (data.current)


        })
    })
})

// the temperature, the humidity, the wind speed, and the UV index