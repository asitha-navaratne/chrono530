let localTime = new Date();
document
  .querySelector(".time-input-section")
  .addEventListener("submit", handleTimeInputSubmit);

function initialize() {
  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");

  const timeString = `${hours}:${minutes}`;

  document.querySelector(".time-input-section__input").value = timeString;

  setUkTime();
}

function updateTime() {
  localTime = new Date();

  setUkTime();
}

function setUkTime() {
  const ukTime = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/London",
  });

  document.querySelector(".clock-body__digital-time").innerHTML = ukTime;

  const [ukHour, ukMinutes] = ukTime.split(":");

  const hourDegrees = ukHour * 30 + 270 + ukMinutes.split(" ")[0] * 0.5;
  const minuteDegrees = ukMinutes.split(" ")[0] * 6 + 270;

  document.querySelector(
    ".clock-body__hour-hand"
  ).style.transform = `rotate(${hourDegrees}deg)`;
  document.querySelector(
    ".clock-body__minute-hand"
  ).style.transform = `rotate(${minuteDegrees}deg)`;
}

function handleTimeInputSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const timeValue = form.querySelector(".time-input-section__input").value;

  const [newHours, newMinutes] = timeValue.split(":");

  localTime = new Date(`1970-01-01T${newHours}:${newMinutes}:00`);

  setUkTime();
  clearInterval(interval);
}

initialize();

const interval = setInterval(updateTime, 1000);
