import { getLocationData } from "./api";

// HTML Elements
const testDiv = document.querySelector(".location-name-container");
const userSearch = document.querySelector(".location-searchbar");
const searchForm = document.querySelector("#search-location-weather");

/**
 * Displays the icon image inside the weather container div
 * @param {string} iconName Returned icon-name from api call
 */
function displayWeatherIcon(iconName) {
    const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${iconName}.png`;

    const iconDiv = document.querySelector(".weather-icon-container");
    iconDiv.innerHTML = "";

    const img = document.createElement("img");
    img.src = iconUrl;
    img.alt = iconName;
    iconDiv.appendChild(img);
}

/**
 *
 * @param {string} location User searched location
 */
async function showWeather(location) {
    try {
        const weatherData = await getLocationData(location);
        displayWeatherIcon(weatherData.currentIcon);

        testDiv.textContent = weatherData.address;
        console.log(weatherData);
    } catch (err) {
        testDiv.textContent = err.message
    }
}

// render.js
function render() {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showWeather(userSearch.value);
        userSearch.value = "";
    });
}

export { render };
