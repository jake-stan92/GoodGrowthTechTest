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

function displayWeather() {
  if (Object.keys(weatherData).length != 0) {
    // create div to house weather data
    const weatherDiv = document.createElement("div");
    // set new div classname
    weatherDiv.setAttribute("class", "weatherDiv");
    // set CSS
    weatherDiv.style.cssText = `
      width: 100%;
      display: flex;
      `;

    // create two child divs to contain left and right content
    const weatherDivLeft = document.createElement("div");
    weatherDivLeft.style.cssText = `
      flex: 1;
      `;
    const weatherDivRight = document.createElement("div");
    weatherDivRight.style.cssText = `
      flex: 1;
      display: grid;
      place-content: center;
      `;

    // div title
    const weatherTitle = document.createElement("h4");
    weatherTitle.textContent = "Current Weather";

    // create p tag to contain current temp
    const currentTemp = document.createElement("p");
    currentTemp.textContent = `Temperature ${weatherData.currentTemp}°C`;
    currentTemp.style.cssText = `
      font-size: 0.75rem;
      margin-bottom: 0.3rem`;

    // create p tag to contain cloud cover
    const cloudCover = document.createElement("p");
    cloudCover.textContent = `Cloud Cover ${weatherData.cloudCover}%`;
    cloudCover.style.cssText = `
      font-size: 0.75rem;
      margin-bottom: 0.3rem`;

    // create p tag to contain wind speed
    const windSpeed = document.createElement("p");
    windSpeed.textContent = `Wind Speed ${weatherData.windSpeed}mph`;
    windSpeed.style.cssText = `
      font-size: 0.75rem;
      margin-bottom: 0.3rem`;

    // create p tag to contain precipitation
    const precipitation = document.createElement("p");
    precipitation.textContent = `Precipitation ${weatherData.precipitation}mm`;
    precipitation.style.cssText = `
      font-size: 0.75rem;
      margin-bottom: 1rem`;

    // create img tag to display current weather icon
    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", weatherData.icon);
    weatherIcon.style.cssText = `
      margin: auto`;

    // create weather condition text
    const weatherText = document.createElement("p");
    weatherText.textContent = weatherData.conditionText;
    weatherText.style.cssText = `
      font-size: 0.75rem;
      margin-bottom: 0.3rem;
      text-align: center`;

    // add child elements to parent LEFT weather div
    weatherDivLeft.appendChild(weatherTitle);
    weatherDivLeft.appendChild(currentTemp);
    weatherDivLeft.appendChild(cloudCover);
    weatherDivLeft.appendChild(windSpeed);
    weatherDivLeft.appendChild(precipitation);

    // add child elements to parent RIGHT weather div
    weatherDivRight.appendChild(weatherIcon);
    weatherDivRight.appendChild(weatherText);

    // append left and right child divs to main div
    weatherDiv.appendChild(weatherDivLeft);
    weatherDiv.appendChild(weatherDivRight);

    // append main div to doc
    pageBody.appendChild(weatherDiv);
  } else {
    // create error p
    const errorText = document.createElement("p");
    errorText.textContent = "Error Getting Weather Data";

    //append error div
    pageBody.appendChild(errorText);
  }
}
