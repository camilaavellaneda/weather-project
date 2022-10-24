let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = `${now.getHours()}`.padStart(2, 0);
let minutes = `${now.getMinutes()}`.padStart(2, 0);
let weekday = weekdays[now.getDay()];

let time = `${hour}:${minutes} ${weekday}`;
document.getElementById("hourday").innerHTML = time;

let date = now.getDate();
let monthnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let month = monthnumbers[now.getMonth()];
let year = now.getFullYear();

let numberdate = `${date}/${month}/${year}`;
document.getElementById("numberdate").innerHTML = numberdate;

let apiKey = "97c2f6a3b34509ac62090edc5d18d949";

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let definedCity1 = document.querySelector("#city");
  definedCity1.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showWeather(response) {
  console.log(response.data);
  let definedCity2 = document.querySelector("#city");
  definedCity2.innerHTML = `${response.data.name}`;
  let temperatureElement = document.querySelector("#number-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature = Math.round(response.data.main.temp);
  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/hr`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  let description = document.querySelector("#state");
  description.innerHTML = `${response.data.weather[0].description}`;
}
document
  .querySelector("#celsius")
  .addEventListener("click", () => changeUnits("celsius"));

document
  .querySelector("#farenheit")
  .addEventListener("click", () => changeUnits("farenheit"));

let celsiusTemperature = -22;
let identifiedTemperatureElement = document.querySelector(
  "#number-temperature"
);

function changeUnits(unit) {
  if (unit === "celsius") {
    identifiedTemperatureElement.innerHTML = `${celsiusTemperature}`;
  } else if (unit === "farenheit") {
    let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let farenheitroundedTemperature = farenheitTemperature.toFixed(0);
    identifiedTemperatureElement.innerHTML = `${farenheitroundedTemperature}`;
    return farenheitTemperature;
  }
}
function geolocationData(position) {
  console.log("fetching data...");
  let geolocationLatitude = position.coords.latitude;
  let geolocationLongitude = position.coords.longitude;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${geolocationLatitude}&lon=${geolocationLongitude}&appid=${apiKey}&units=metric`;
  function innerGeolocationHTML(response) {
    console.log("changing html...");
    let geolocationTemperatureElement = document.querySelector(
      "#number-temperature"
    );
    geolocationTemperatureElement.innerHTML = Math.round(
      response.data.main.temp
    );
    celsiusTemperature = Math.round(response.data.main.temp);
    console.log(response.data);
    let geolocationCity = document.querySelector("#city");
    geolocationCity.innerHTML = `${response.data.name}`;
    let geolocationHumidity = document.querySelector("#humidity");
    geolocationHumidity.innerHTML = `Humidity: ${Math.round(
      response.data.main.humidity
    )}%`;
    let geolocationWindSpeed = document.querySelector("#windspeed");
    geolocationWindSpeed.innerHTML = `Wind: ${Math.round(
      response.data.wind.speed
    )}km/hr`;
  }
  axios.get(apiUrl2).then(innerGeolocationHTML);
}
function currentGeolocation() {
  console.log("getting current location...");
  navigator.geolocation.getCurrentPosition(geolocationData);
}
let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", currentGeolocation);
