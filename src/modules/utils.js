function toFarenheit(num) {
    const celsius = num * (9 / 5) + 32;
    return parseFloat(celsius.toFixed(1))
}

function toCelsius(num) {
    const farenheit = (num - 32) * (5 / 9);
    return parseFloat(farenheit.toFixed(1))
}



export {toFarenheit, toCelsius}