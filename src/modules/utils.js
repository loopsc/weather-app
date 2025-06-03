function toFarenheit(num) {
    const celsius = num * (9 / 5) + 32;
    return parseFloat(celsius.toFixed(1))
}

function toCelsius(num) {
    const farenheit = (num - 32) * (5 / 9);
    return parseFloat(farenheit.toFixed(1))
}

function getNewDayOffset() {
    const now = new Date()
    const currentHour = now.getHours()

    // If this is true, then we are in the next day
    if (currentHour + 5 >= 24) {
        return 1
    } else {
        return 0
    }
}

export {toFarenheit, toCelsius, getNewDayOffset}