function displayWeather(response) {
  let currentWeather = document.querySelector("#current-units");
  let cityValue = document.querySelector("#city");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let currentForecast = document.querySelector("#current-forecast");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let currentIcon = document.querySelector("#weather-icon");

  currentWeather.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;
  cityValue.innerHTML = `${response.data.city}`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentForecast.innerHTML = response.data.condition.description;
  timeElement.innerHTML = currentDate(date);
  currentIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function currentDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "0d2cte0be54db50aa4a1f3bb6f646o78";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-input-form");

  searchCity(inputCity.value);
}

let searchCityElement = document.querySelector("#search-form");
searchCityElement.addEventListener("submit", displayCity);

searchCity("Pretoria");
