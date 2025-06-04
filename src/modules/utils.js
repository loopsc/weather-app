function toCelsius(num) {
    const celsius = (num - 32) * (5 / 9);
    return parseFloat(celsius.toFixed(1));
}

function formatTemp(temp, unit) {
    if (unit === "c") {
        return `${toCelsius(temp)}\u00B0C`;
    } else if (unit === "f") {
        return `${temp.toFixed(1)}\u00B0F`;
    }
}

function getNewDayOffset() {
    const now = new Date();
    const currentHour = now.getHours();

    // If this is true, then we are in the next day
    if (currentHour + 5 >= 24) {
        return 1;
    } else {
        return 0;
    }
}

export { formatTemp, getNewDayOffset };
