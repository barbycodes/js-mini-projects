function calculateSum(num1, num2) {
  return num1 + num2;
}

function calculateDifference(num1, num2) {
  return num1 - num2;
}

function calculateProduct(num1, num2) {
  return num1 * num2;
}

function calculateQuotient(num1, num2) {
  return num2 === 0 ? "Error" : num1 / num2;
}

function calculateSquare(num) {
  return num ** 2;
}

function calculateSquareRoot(num) {
  return Math.sqrt(num);
}

// UI FUNCTIONS

function showSum() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  document.getElementById("result").textContent = calculateSum(n1, n2);
}

function showDifference() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  document.getElementById("result").textContent = calculateDifference(n1, n2);
}

function showProduct() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  document.getElementById("result").textContent = calculateProduct(n1, n2);
}

function showQuotient() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  document.getElementById("result").textContent = calculateQuotient(n1, n2);
}

function showSquare() {
  let n = Number(document.getElementById("square-input").value);
  document.getElementById("result").textContent = calculateSquare(n);
}

function showSquareRoot() {
  let n = Number(document.getElementById("square-input").value);
  document.getElementById("result").textContent = calculateSquareRoot(n);
}