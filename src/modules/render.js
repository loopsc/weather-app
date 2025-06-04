import { getLocationData } from "./api";
import { formatTemp, getNewDayOffset } from "./utils";
import { addDays, format } from "date-fns";
import { getTempUnit, setTempUnit } from "./storage";

// HTML Elements
const locationNameContainer = document.querySelector(
    ".location-name-container"
);
const userSearch = document.querySelector(".location-searchbar");
const searchForm = document.querySelector("#search-location-weather");

function displayWeekForecast(dailyData) {
    const weeklySection = document.querySelector(".weekly-data");
    weeklySection.innerHTML = "";

    dailyData.forEach((day, index) => {
        const box = document.createElement("div");
        box.classList.add("day-box");

        const weekday = document.createElement("p");
        weekday.classList.add("week-temp-text");
        if (index == 0) {
            weekday.textContent = "Tomorrow";
        } else {
            const futureDate = addDays(new Date(), index + 1);
            weekday.textContent = format(futureDate, "dd-MM");
        }

        const icon = document.createElement("img");
        icon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${day.icon}.png`;
        icon.alt = day.icon;

        const temp = document.createElement("p");
        temp.classList.add("week-temp-text");
        temp.textContent = formatTemp(day.temp, getTempUnit());

        box.append(weekday, icon, temp);
        weeklySection.appendChild(box);
    });
}

/**
 * Displays the icon image inside the weather container div
 * @param {string} currentIconName Returned icon-name from api call
 */
function displayWeatherIcons(currentIconName, futureIconName) {
    const iconData = [
        { name: currentIconName, div: "[data-icon-day='current']" },
        { name: futureIconName, div: "[data-icon-day='future']" },
    ];

    iconData.forEach(({ name, div }) => {
        const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${name}.png`;
        const container = document.querySelector(div);

        if (container) {
            container.innerHTML = "";
            const img = document.createElement("img");
            img.src = iconUrl;
            img.alt = name;
            container.appendChild(img);
        }
    });
}

/**
 * Helper function to display temp and conditions
 * @param {number} temp Temperature to display
 * @param {string} condition Description of conditions
 * @param {div} temperatureDiv container to hold temperature
 * @param {div} conditionDiv container to hold condition text
 */
function displayWeather(temp, condition, temperatureDiv, conditionDiv) {
    const tempDiv = document.querySelector(temperatureDiv);
    const condDiv = document.querySelector(conditionDiv);

    tempDiv.textContent = formatTemp(temp, getTempUnit());
    condDiv.textContent = condition;
}

function displayCurrentWeatherData(temp, condition) {
    displayWeather(temp, condition, ".current-temp", ".current-condition");
}

function displayFutureWeatherData(temp, condition) {
    displayWeather(temp, condition, ".future-temp", ".future-condition");
}

/**
 *  Updates the icon and location name
 * @param {string} location User searched location
 */
async function showWeather(location) {
    try {
        const dayOffset = getNewDayOffset();
        const weatherData = await getLocationData(location, dayOffset);

        locationNameContainer.textContent = weatherData.address;

        displayWeatherIcons(weatherData.currentIcon, weatherData.futureIcon);
        displayCurrentWeatherData(weatherData.temp, weatherData.condition);
        displayFutureWeatherData(
            weatherData.futureTemp,
            weatherData.futureCondition
        );
        displayWeekForecast(weatherData.days.slice(1, 8));

        console.log(weatherData);
    } catch (err) {
        locationNameContainer.textContent = err.message;
    }
}

// render.js
function render() {
    showWeather("hamilton,nz");
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showWeather(userSearch.value);

        userSearch.value = "";
    });
}

export { render };
