function setInitialTime() {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();

  const timeString = `${hours}:${minutes >= 10 ? minutes : "0" + minutes}`;

  document.querySelector(".clock-body__time").innerHTML = timeString;

  return timeString;
}

function setTimeInputValue(timeString) {
  document.querySelector(".time-input-section__input").value = timeString;
}

const timeString = setInitialTime();
setTimeInputValue(timeString);

setInterval(setInitialTime, 1000);
