var myKey = config.MY_KEY;
var cityInput = document.querySelector("#search-input");
var searchCityEl = document.querySelector("#search-city");
var cityListEl = document.querySelector("#city-list");
var cities = [];
// Get search input and add it to an array

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search; //.split('&');
  console.log(searchParamsArr);

  // Get the query and format values
  var query = searchParamsArr.split("=").pop();
  //   var format = searchParamsArr[1].split('=').pop();
  console.log(query);

  // add search input to localstorage

  searchApi(query);
}

// Form submit functions
searchCityEl.addEventListener("search", function (event) {
  event.preventDefault();

  var cityText = cityInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (cityText === "") {
    return;
  }

  // // print to the page
  cityListEl.append(cityText);

  // Add new cityText to cities array, clear the input
  cities.push(cityText);
  cityInput.value = "";

  // Store updated cities in localStorage, re-render the list
  storeCities();
  renderCities();
  searchApi(cityText);
});

// // clear the form input element
// $('input[name="search-input"]').val("");

function storeCities() {
  // Stringify and set key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
}

function renderCities() {
  // Clear cityList element and update userCityRes
  cityListEl.innerHTML = "";

  // Render a new li for each city
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

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
  var locQueryUrl = "api.openweathermap.org/data/2.5/weather?q=";

  locQueryUrl = locQueryUrl + query + "&appid=" + myKey;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
      console.log(response);
    })

    .then(function (locRes) {
      console.log(locRes);

      // write query to page so user knows what they are viewing
      resultTextEl.textContent = query;

      if (!locRes.length) {
        console.log("No results found!");
        resultContentEl.innerHTML = "<h3>No results found, search again!</h3>";
      } else {
        resultContentEl.textContent = "";
        for (var i = 0; i < locRes.length; i++) {
          printResults(locRes[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

init();
