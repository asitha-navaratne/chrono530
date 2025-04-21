const localTime = new Date();

function setInitialUkTimes() {
  const ukTime = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  });

  document.querySelector(".clock-body__time").innerHTML = ukTime;

  const [ukHour, ukMinutes] = ukTime.split(":");

  const hourDegrees = ukHour * 30 + 270 + ukMinutes * 0.5;
  const minuteDegrees = ukMinutes * 6 + 270;

  document.querySelector(
    ".clock-body__hour-hand"
  ).style.transform = `rotate(${hourDegrees}deg)`;
  document.querySelector(
    ".clock-body__minute-hand"
  ).style.transform = `rotate(${minuteDegrees}deg)`;
}

function setInitialTimeInputValue() {
  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");

  const timeString = `${hours}:${minutes}`;

  document.querySelector(".time-input-section__input").value = timeString;
}

setInitialUkTimes();
setInitialTimeInputValue();

setInterval(setInitialUkTimes, 1000);
