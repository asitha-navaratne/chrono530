let localTime = new Date();
let interval;

const title = document.querySelector(".title");
const hourHand = document.querySelector(".clock-body__hour-hand");
const minuteHand = document.querySelector(".clock-body__minute-hand");
const digitalTime = document.querySelector(".clock-body__digital-time");
const localeButtons = document.querySelectorAll('input[name="locale"]');
const slRadioButton = document.querySelector(
  'input[name="locale"][value="sl"]'
);
const timeSectionTitle = document.querySelector(".time-section__title");
const timeInput = document.querySelector(".time-section__input");
const convertButton = document.querySelector(".time-section__convert-button");
const resetButton = document.querySelector(".time-section__reset-button");

convertButton.addEventListener("click", handleTimeInputSubmit);
resetButton.addEventListener("click", handleReset);
localeButtons.forEach((button) => {
  button.addEventListener("change", () => {
    if (button.value === "uk") {
      title.innerHTML = "Current time in SL";
      timeSectionTitle.innerHTML = "Enter a time in UK";

      const ukTime = localTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/London",
      });

      timeInput.value = ukTime;
      setSlTime();
    } else {
      title.innerHTML = "Current time in UK";
      timeSectionTitle.innerHTML = "Enter a time in SL";

      const hours = String(localTime.getHours()).padStart(2, "0");
      const minutes = String(localTime.getMinutes()).padStart(2, "0");

      const slTimeString = `${hours}:${minutes}`;

      timeInput.value = slTimeString;
      setUkTime();
    }
  });
});

function initialize() {
  slRadioButton.checked = true;
  interval = setInterval(updateTime, 1000);

  title.innerHTML = "Current time in UK";
  timeSectionTitle.innerHTML = "Enter a time in SL";

  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");

  const timeString = `${hours}:${minutes}`;

  timeInput.value = timeString;
  setUkTime();
}

function updateTime() {
  localTime = new Date();

  const selectedLocale = document.querySelector('input[name="locale"]:checked');
  if (selectedLocale.value === "sl") {
    setUkTime();
  } else {
    setSlTime();
  }
}

function setUkTime() {
  const ukTime = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/London",
  });

  digitalTime.innerHTML = ukTime;

  const [ukHour, ukMinutes] = ukTime.split(":");

  const hourDegrees = ukHour * 30 + 270 + ukMinutes.split(" ")[0] * 0.5;
  const minuteDegrees = ukMinutes.split(" ")[0] * 6 + 270;

  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
}

function setSlTime() {
  const slTime = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  digitalTime.innerHTML = slTime;

  const [slHour, slMinutes] = slTime.split(":");

  const hourDegrees = slHour * 30 + 270 + slMinutes.split(" ")[0] * 0.5;
  const minuteDegrees = slMinutes.split(" ")[0] * 6 + 270;

  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
}

function handleTimeInputSubmit() {
  const timeValue = timeInput.value;

  const [newHours, newMinutes] = timeValue.split(":");

  const selectedLocale = document.querySelector('input[name="locale"]:checked');

  if (selectedLocale.value === "sl") {
    localTime = new Date(`1970-01-01T${newHours}:${newMinutes}:00`);
    setUkTime();
  } else {
    localTime = new Date(`1970-01-01T${newHours}:${newMinutes}:00`);
    localTime.setHours(localTime.getHours() + 4);
    localTime.setMinutes(localTime.getMinutes() + 30);
    setSlTime();
  }
  clearInterval(interval);
}

function handleReset() {
  localTime = new Date();

  initialize();
  setUkTime();
}

initialize();
