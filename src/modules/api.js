const apiKey = "K3DLM99JVQ3K9FXRM55LCYMP8";

/**
 * Get the weather data at a given location
 * @param {string} location Location to search
 * @returns JSON object representing location weather.
 */
async function getLocationData(location) {
    const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`
    );

    if (!response.ok) {
        throw new Error('Invalid location name')
    }

    const data = await response.json();

    return {
        address: data.resolvedAddress,
        condition: data.currentConditions.conditions,
        tomorrowCondition: data.days[1].conditions,
        tomorrowTemp: data.days[1].temp,
        temp: data.currentConditions.temp,
        currentIcon: data.currentConditions.icon,
    };
}

export { getLocationData };
