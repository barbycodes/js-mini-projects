function maskEmail(email) {
  let atIndex = email.indexOf("@");

  let username = email.slice(0, atIndex);
  let domain = email.slice(atIndex);

  let first = username[0];
  let last = username[username.length - 1];
  let middle = "*".repeat(username.length - 2);

  return first + middle + last + domain;
}

function handleMask() {
  let email = document.getElementById("email-input").value;
  let result = document.getElementById("result");

  if (!email.includes("@")) {
    result.textContent = "Please enter a valid email.";
    result.style.color = "red";
    return;
  }

  result.textContent = maskEmail(email);
  result.style.color = "#a78bfa";
}