function setInitialTimes() {
  const localTime = new Date();
  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");

  const timeString = `${hours}:${minutes}`;

  const ukTime = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  });

  document.querySelector(".clock-body__time").innerHTML = ukTime;

  return timeString;
}

function setTimeInputValue(timeString) {
  document.querySelector(".time-input-section__input").value = timeString;
}

const timeString = setInitialTimes();
setTimeInputValue(timeString);

setInterval(setInitialTimes, 1000);
