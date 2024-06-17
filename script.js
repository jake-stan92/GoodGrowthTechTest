const API_KEY = "";
const pageBody = document.querySelector(".kOBmMQ");
const coordURL = document.getElementById("propertyViewOnGoogleMaps_image").href;
let weatherData = {};

function formatCoords(url) {
  const coords = url.split("destination=").pop();
  const formattedCoords = coords.replace("%2C", ",");
  return formattedCoords;
}

async function getWeather(location) {
  let data;
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
  );
  if (response.ok) {
    data = await response.json();
  } else {
    // fall back to region if specific location cannot be found
    response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${window.globalDataLayer.propertySubRegion}`
    );
    data = await response.json();
  }
  weatherData = {
    currentTemp: data.current.temp_c,
    cloudCover: data.current.cloud,
    windSpeed: data.current.wind_mph,
    precipitation: data.current.precip_mm,
    icon: data.current.condition.icon,
    conditionText: data.current.condition.text,
  };
}
