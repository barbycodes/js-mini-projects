function confirmEnding(str, target) {
  return str.endsWith(target);
}

function checkEnding() {
  let text = document.getElementById("text-input").value;
  let target = document.getElementById("target-input").value;
  let result = document.getElementById("result");

  if (confirmEnding(text, target)) {
    result.textContent = "It ends with the target string!";
    result.style.color = "green";
  } else {
    result.textContent = "It does not end with the target string.";
    result.style.color = "red";
  }
}