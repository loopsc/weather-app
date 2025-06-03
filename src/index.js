import "./styles.css";

const apiKey = "K3DLM99JVQ3K9FXRM55LCYMP8";

// HTML Elements
const testDiv = document.querySelector("[data-api-result]");
const searchButton = document.querySelector(".submit-location");

searchButton.addEventListener("click", () => {
    const userSearch = document.querySelector(".search-location").value;

    getLocationData(userSearch).then((data) => {
        testDiv.textContent = data.description;
    });
});

/**
 *
 * @param {string} location Location to search
 * @returns JSON object representing location weather.
 */
async function getLocationData(location) {
    //prettier-ignore
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`);
    const data = await response.json();

    console.log(data);

    return data;
}
