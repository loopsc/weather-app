// Default to c if nothing in storage
let tempUnit = localStorage.getItem("tempUnit") || "c";

function getTempUnit() {
    return tempUnit;
}

function setTempUnit(unit) {
    tempUnit = unit;
    localStorage.setItem("tempUnit", tempUnit);
}

export { getTempUnit, setTempUnit };
