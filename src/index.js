let now = new Date();

function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

   if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let formattedDay = `${currentDay}`;
  let formattedHours = `${currentHour}:${currentMinutes}`;

  let dateDay = document.querySelector(".day");
  dateDay.innerHTML = formattedDay;

  let dateHour = document.querySelector(".hours");
  dateHour.innerHTML = formattedHours;
}

formatDate(now);

let input = document.querySelector("#insert-place");

function searchUp(event) {
  event.preventDefault();

  console.log(input.value);

  let typedPlace = input.value;
  let changePlace = document.querySelector("h1");
  changePlace.innerHTML = typedPlace;

  let apiKey = "804b257270bd9a0d0e4b7cd0e1785455";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typedPlace}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchUp);

function formatDay (timestamp) {

let date = new Date(timestamp * 1000);
let day = date.getDay();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForecast(response) {

        let forecast = response.data.daily;
        let forecastElement = document.querySelector("#forecast");
        
        let forecastHTML = `<div class="row row-small-days">`;

        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        forecast.forEach(function (forecastDay, index) {

          if (index < 6) {

          forecastHTML = forecastHTML + `
              <div class="day-week">
              <p>${formatDay (forecastDay.dt)}</p>
              <div class="circle">
                  <div class="info-temperature">
                      <p class="temperatureSmall" id="TempMon"><span> ${Math.round(forecastDay.temp.max)}ºC </span> <span>${Math.round(forecastDay.temp.min)}ºC</span></p>
                  </div>
              </div>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="fas fa-cloud-sun"></img>
              </div>
              `; }
              
        });

        forecastHTML = forecastHTML + `<\div>`;
        forecastElement.innerHTML = forecastHTML; 
      
 
}

function getForecast (coordinates) {
  console.log(coordinates);
  let apiKey = "804b257270bd9a0d0e4b7cd0e1785455";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "804b257270bd9a0d0e4b7cd0e1785455";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperatureNumber");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#iconic");

  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}

search("Paris");
