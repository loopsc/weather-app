import { getLocationData } from "./api";
import { formatTemp, getNewDayOffset } from "./utils";
import { addDays, format } from "date-fns";
import { getTempUnit, setTempUnit } from "./storage";

// HTML Elements
const locationName = document.querySelector(
    ".location-name"
);
const timezone = document.querySelector(".timezone")
const userSearch = document.querySelector(".location-searchbar");
const searchForm = document.querySelector("#search-location-weather");
const tempToggle = document.querySelector("#temp-toggle");
let currentLocation = "hamilton,nz";

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
 *  Updates the icons and location name
 * @param {string} location User searched location
 */
async function showWeather(location) {
    try {
        const dayOffset = getNewDayOffset();
        const weatherData = await getLocationData(location, dayOffset);

        locationName.textContent = `${weatherData.address[0].toUpperCase()+ weatherData.address.slice(1)}`;
        timezone.textContent = weatherData.timezone;

        displayWeatherIcons(weatherData.currentIcon, weatherData.futureIcon);
        displayCurrentWeatherData(weatherData.temp, weatherData.condition);
        displayFutureWeatherData(
            weatherData.futureTemp,
            weatherData.futureCondition
        );
        displayWeekForecast(weatherData.days.slice(1, 8));

        console.log(weatherData);
    } catch (err) {
        locationName.textContent = err.message;
    }
}

// render.js
function render() {
    tempToggle.checked = getTempUnit() === "f";
    tempToggle.addEventListener("change", () => {
        const unit = tempToggle.checked ? "f" : "c";
        setTempUnit(unit);
        showWeather(currentLocation);

        if (tempToggle.checked) {
            document.body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2022/09/20/14/21/us-flag-7468031_960_720.jpg')";
        }
        else {
            document.body.style.backgroundImage = "none"
        }
    });

    showWeather(currentLocation);

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        currentLocation = userSearch.value;
        showWeather(userSearch.value);

        userSearch.value = "";
    });
}

export { render };
