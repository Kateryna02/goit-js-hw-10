// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";





let userSelectedDate;

const dataStart = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const currentDate = Date.now();

        if (userSelectedDate < currentDate) {
            window.alert("Please choose a date in the future");
            dataStart.disabled = true;
        } else {
            dataStart.disabled = false;
        }
    },
};

dataStart.addEventListener('click', () => {
    flatpickr("#datetime-picker", options);
});

function updateTimerInterface({ days, hours, minutes, seconds }) {
    dataDays.textContent = days.toString().padStart(2, '0');
    dataHours.textContent = hours.toString().padStart(2, '0');
    dataMinutes.textContent = minutes.toString().padStart(2, '0');
    dataSeconds.textContent = seconds.toString().padStart(2, '0');
}

let intervalId; 

dataStart.addEventListener('click', () => {
    const currentDate = Date.now();

    if (userSelectedDate < currentDate) {
        window.alert("Please choose a date in the future");
        dataStart.disabled = true;
    } else {
        dataStart.disabled = false;
        const timeDifference = userSelectedDate - currentDate;

        intervalId = setInterval(() => {
            const currentDate = Date.now();
            const timeLeft = convertMs(userSelectedDate - currentDate);
            updateTimerInterface(timeLeft);

            if (userSelectedDate <= currentDate) {
                clearInterval(intervalId);
                dataStart.disabled = true;
            }
        }, 1000);
    }
});


function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}