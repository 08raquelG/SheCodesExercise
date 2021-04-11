let now = new Date();
function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();

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

  console.log(response);
}

