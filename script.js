let now = new Date();
let date= now.getDate();
let hours =now.getHours();
if (hours<10){
  hours =`0${hours}`;
}
let minutes =now.getMinutes();
if (minutes <10){
  minutes= `0${minutes}`;
}
let year = now.getFullYear();
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day=days[now.getDay()];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month =months[now.getMonth()];
let time = document.querySelector("#time");
time.innerHTML=`${day} ${month} ${date}, ${year} ${hours}:${minutes} `;

function showCurrentTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML=response.data.weather[0].main;
  document.querySelector("#maxTemp").innerHTML=Math.round(response.data.main.temp_max);
  document.querySelector("#minTemp").innerHTML=Math.round(response.data.main.temp_min);
}

function searchCity (city){
  let apiKey="04516b03d862a33f9817076057aa38aa";
  let units="metric";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let city=document.querySelector("#input").value;
  searchCity(city);
}
function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position){
  let apiKey="04516b03d862a33f9817076057aa38aa";
  let lat= position.coords.latitude;
  let lon= position.coords.longitude;
  let units="metric";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function search(event) {
event.preventDefault();
let searchInput= document.querySelector("#input");

let h2= document.querySelector("h2");
h2.innerHTML=`${searchInput.value}`;
}

let form= document.querySelector("#city-input");

form.addEventListener("submit", handleSubmit);


function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML= 17;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement= document.querySelector("#temperature");
  temperatureElement.innerHTML= (17* 1.8 +32);
}

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);


let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let nearMe= document.querySelector("#near-me");
nearMe.addEventListener("click", getCurrentLocation);

searchCity("New York");
