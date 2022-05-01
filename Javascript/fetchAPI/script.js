async function getWeather(){
let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=45.4642&lon=9.19&appid=e21c453d380f0ca1bc5d071698438e15&units=metric",{
method:"GET"
});

//fetch("https://api.openweathermap.org/geo/1.0/direct?q=Milan&appid=e21c453d380f0ca1bc5d071698438e15",{
// method:"GET"
// });

let jsonObj = await response.json();
console.log(jsonObj);
document.getElementById('weather-temp').innerText= jsonObj.main.temp + "°";
}

getWeather();