function displayWeather(response) {
  let currentWeather = document.querySelector("#current-units");
  currentWeather.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;

  let cityValue = document.querySelector("#city");
  cityValue.innerHTML = `${response.data.city}`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let currentForecast = document.querySelector("#current-forecast");
  currentForecast.innerHTML = response.data.condition.description;
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
