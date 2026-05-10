let count = 0;

function cardCounter(card) {
  if (card == 2 || card == 3 || card == 4 || card == 5 || card == 6) {
    count++;
  }
  else if (card == 7 || card == 8 || card == 9) {
    count = count;
  }
  else {
    count--;
  }

  if (count > 0) {
    return count + " Bet";
  } else {
    return count + " Hold";
  }
}

function handleCard() {
  let card = document.getElementById("card-input").value;
  let result = document.getElementById("result");

  if (card === "") {
    result.textContent = "Please enter a card.";
    result.style.color = "red";
    return;
  }

  result.textContent = cardCounter(card);
  result.style.color = "#34d399";
}