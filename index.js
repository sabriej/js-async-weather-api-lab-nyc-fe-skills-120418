const API_KEY = "ed3f0724019941561e0431a52e68f889";

// 1. We need an event listener for the input 
// 2. Get what they typed in,and then fetch data from the weather API for that city
// 3. Fill out the forecast/graph 

function handleFormSubmit(event) {
  //handle submit event
  event.preventDefault();
// Get the text that they typed in 
const input = document.querySelector('#city');
//use the .value to get the text
const whatTheyTyped = input.value;
fetchCurrentWeather(whatTheyTyped);
fetchFiveDayForecast(whatTheyTyped);
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  // query parameter
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + API_KEY + '&units=imperial')
  .then(response => response.json())
  .then(json => displayCurrentWeather(json));
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
// Update our HTML
const tableCell = document.querySelector('#temp');
const lowCell = document.querySelector('#low');
const highCell = document.querySelector('#high');
const humidityCell = document.querySelector('#humidity');
const cloudCell = document.querySelector('#cloudCover');
const currentTemperature = json.main.temp;
tableCell.innerHTML = currentTemperature;
lowCell.innerHTML = json.main.temp_min;
 highCell.innerHTML = json.main.temp_max;
 humidityCell.innerHTML = json.main.humidity;
 cloudCell.innerHTML = json.clouds.all;
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + API_KEY + '&units=imperial')
  .then(response => response.json())
  .then(json => displayFiveDayForecast(json));
}
  

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  
  // "<div> <p> day </p> <p>low</p> <p>high</p> </div>"
  let innerHTMLString = '';
  for (let forecast of json.list) {
    // 3 things: we want the day, we want the low, and the 
    let currentDivString = '<div>';
    const day = forecast.dt_txt;
    const low = forecast.main.temp_min;
    const high = forecast.main.temp_max;
    currentDivString = currentDivString + "<p>" + day + "</p>" + "<p>" + low + "</p>" + "<p>" + high + "</p>" + "</div>";
    innerHTMLString = innerHTMLString + currentDivString;
    // put this in a div
    // const div = document.createElement()
  }
  const aside = document.querySelector('aside');
  aside.innerHTML = innerHTMLString;
}
function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
const ctx = document.getElementById('WeatherChart').getContent('2d');
var mtChart = new Chart(ctx, {
  
}


document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit', handleFormSubmit);
});
