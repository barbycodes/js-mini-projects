function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
    return year + " is a leap year.";
  } else {
    return year + " is not a leap year.";
  }
}

function checkLeapYear() {
  let year = document.getElementById("year-input").value;
  let result = document.getElementById("result");

  if (year === "") {
    result.textContent = "Please enter a year.";
    result.style.color = "red";
    return;
  }

  result.textContent = isLeapYear(Number(year));
  result.style.color = "#1e3a8a";
}