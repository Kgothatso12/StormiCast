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

  getUpcomingForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getUpcomingForecast(city) {
  let apiKey = "0d2cte0be54db50aa4a1f3bb6f646o78";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let UpcomingForecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      UpcomingForecastHtml =
        UpcomingForecastHtml +
        ` <div class='weather-forecast'>
      <div class="upcoming-days">${formatDay(day.time)}</div>
          <div class="upcoming-weather-icon"><img src='${
            day.condition.icon_url
          }'/></div>
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-units"> ${Math.round(
              day.temperature.maximum
            )} °</span>
            <span class="weather-forecast-units">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#upcoming-forecast");
  forecastElement.innerHTML = UpcomingForecastHtml;
}

let searchCityElement = document.querySelector("#search-form");
searchCityElement.addEventListener("submit", displayCity);

searchCity("Pretoria");
