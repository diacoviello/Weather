var cityInput = document.querySelector("#search-input");
var searchCityEl = document.querySelector("#search-city");
var cityListEl = document.querySelector("#city-list");
var cities = [];

// Get search input and add it to an array

// Form submit functions

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var cityText = cityInput.value.trim();

  // Return from function early if submitted citytext is blank
  if (cityText === "") {
    return;
  }

  // // print to the page
  cityListEl.append(cityText);

  // Add new cityText to cities array, clear the input
  if (!cities.includes(cityText)) {
    cities.push(cityText);
  }
  // cityInput.value = "";

  console.log(cityText);

  // Store updated cities in localStorage, re-render the list
  storeCities();
  renderCities();
  searchApi(cityText);
}

searchCityEl.addEventListener("submit", handleSearchFormSubmit);
console.log(searchCityEl);

// // clear the form input element
// $('input[name="search-input"]').val("");

function printResults(resultObj) {
  console.log(resultObj);

  var locDateDisplay = document.getElementById("locdate");
  var temperature = resultObj.current.temp + " °F";
  var windy = resultObj.current.wind_speed + " MPH";
  var humidity = resultObj.current.humidity + "%";
  var uvindex = resultObj.current.uvi;
  var iconImg = document.getElementById("img");
  iconImg.src =
    "https://openweathermap.org/img/wn/" +
    resultObj.current.weather[0].icon +
    ".png";
  iconImg.setAttribute("height", 70);
  iconImg.setAttribute("width", 70);

  var currDate = new Date(resultObj.current.dt * 1000).toDateString();

  locDateDisplay.innerHTML = cityInput.value + " (" + currDate + ")";
  // document.getElementById("img").innerHTML =
  document.getElementById("temp").innerHTML = "Temperature: " + temperature;
  document.getElementById("wind").innerHTML = "Wind Speed: " + windy;
  document.getElementById("humid").innerHTML = "Humidity: " + humidity;
  document.getElementById("uvindex").innerHTML = "UV Index: " + uvindex;

  var date1 = document.getElementById("date1");
  date1.innerHTML = new Date(resultObj.daily[1].dt * 1000).toDateString();
  var icon1 = document.getElementById("icon1");
  icon1.src =
    "https://openweathermap.org/img/wn/" +
    resultObj.daily[1].weather[0].icon +
    ".png";
  console.log(icon1);
  icon1.setAttribute("height", 45);
  icon1.setAttribute("width", 45);
  document.getElementById("temp1").innerHTML =
    "Temp: " + resultObj.daily[1].temp.day + " °F";
  document.getElementById("hum1").innerHTML =
    "Humidity: " + resultObj.daily[1].humidity + "%";

  var date2 = document.getElementById("date2");
  date2.innerHTML = new Date(resultObj.daily[2].dt * 1000).toDateString();
  var icon2 = document.getElementById("icon2");
  icon2.src =
    "https://openweathermap.org/img/wn/" +
    resultObj.daily[2].weather[0].icon +
    ".png";
  console.log(icon2);
  icon2.setAttribute("height", 45);
  icon2.setAttribute("width", 45);
  document.getElementById("temp2").innerHTML =
    "Temp: " + resultObj.daily[2].temp.day + " °F";
  document.getElementById("hum2").innerHTML =
    "Humidity: " + resultObj.daily[2].humidity + "%";

  var date3 = document.getElementById("date3");
  date3.innerHTML = new Date(resultObj.daily[3].dt * 1000).toDateString();
  var icon3 = document.getElementById("icon3");
  icon3.src =
    "https://openweathermap.org/img/wn/" +
    resultObj.daily[3].weather[0].icon +
    ".png";
  console.log(icon3);
  icon3.setAttribute("height", 45);
  icon3.setAttribute("width", 45);
  document.getElementById("temp3").innerHTML =
    "Temp: " + resultObj.daily[3].temp.day + " °F";
  document.getElementById("hum3").innerHTML =
    "Humidity: " + resultObj.daily[3].humidity + "%";

  var date4 = document.getElementById("date4");
  date4.innerHTML = new Date(resultObj.daily[4].dt * 1000).toDateString();
  var icon4 = document.getElementById("icon4");
  icon4.src =
    "https://openweathermap.org/img/wn/" +
    resultObj.daily[4].weather[0].icon +
    ".png";
  console.log(icon4);
  icon4.setAttribute("height", 45);
  icon4.setAttribute("width", 45);
  document.getElementById("temp4").innerHTML =
    "Temp: " + resultObj.daily[4].temp.day + " °F";
  document.getElementById("hum4").innerHTML =
    "Humidity: " + resultObj.daily[4].humidity + "%";

  var date5 = document.getElementById("date5");
  date5.innerHTML = new Date(resultObj.daily[5].dt * 1000).toDateString();
  var icon5 = document.getElementById("icon5");
  icon5.src =
    "https://openweathermap.org/img/wn/" +
    resultObj.daily[5].weather[0].icon +
    ".png";
  console.log(icon5);
  icon5.setAttribute("height", 45);
  icon5.setAttribute("width", 45);
  document.getElementById("temp5").innerHTML =
    "Temp: " + resultObj.daily[5].temp.day + " °F";
  document.getElementById("hum5").innerHTML =
    "Humidity: " + resultObj.daily[5].humidity + "%";
}

function storeCities() {
  // Stringify and set key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
}

function renderCities() {
  // Clear cityList element and update userCityRes
  cityListEl.innerHTML = "";

  // Render a new li for each city
  for (var i = 0; i < cities.length; i++) {
    const city = cities[i];

    var li = document.createElement("li");
    var button = document.createElement("button");
    button.textContent = city;
    button.className = "city-btn";
    button.setAttribute("data-index", i);
    li.appendChild(button);

    button.addEventListener("click", function (event) {
      cityInput.value = city;
      searchApi(city);
    });

    cityListEl.appendChild(li);
  }
}

function init() {
  // Get stored cities from localStorage
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  // If cities were retrieved from localStorage, update the cities array to it
  if (storedCities !== null) {
    cities = storedCities;
  }

  // This is a helper function that will render cities to the DOM
  renderCities();
}

//call API openweather
function searchApi(query) {
  var locQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  locQueryUrl =
    locQueryUrl + query + "&appid=" + "6d4473720e2d9193d592f1ea5f1c6e6e";
  console.log(locQueryUrl);

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      coordQueryUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        data.coord.lat +
        "&lon=" +
        data.coord.lon +
        "&exclude=minutely,hourly,alerts&appid=" +
        "6d4473720e2d9193d592f1ea5f1c6e6e" +
        "&units=imperial";
      fetch(coordQueryUrl)
        .then(function (response) {
          return response.json();
        })

        .then(function (data) {
          printResults(data);
          console.log(data);
        });
    })

    .catch(function (error) {
      console.error(error);
    });
}

init();
