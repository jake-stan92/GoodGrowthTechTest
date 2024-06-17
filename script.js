const API_KEY = "";
const pageBody = document.querySelector(".kOBmMQ");
const coordURL = document.getElementById("propertyViewOnGoogleMaps_image").href;
let weatherData = {};

function formatCoords(url) {
  const coords = url.split("destination=").pop();
  const formattedCoords = coords.replace("%2C", ",");
  return formattedCoords;
}
