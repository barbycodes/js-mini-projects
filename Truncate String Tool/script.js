function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

function handleTruncate() {
  const text = document.getElementById("text-input").value;
  const num = Number(document.getElementById("num-input").value);
  const result = document.getElementById("result");

  if (!text || !num) {
    result.textContent = "Please fill in both fields.";
    result.style.color = "red";
    return;
  }

  result.textContent = truncateString(text, num);
  result.style.color = "#1e3a8a";
}