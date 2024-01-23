// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";




let timeDeadline;

const dataStart = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

dataStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const userSelectedDate = selectedDates[0];
        if (userSelectedDate < options.defaultDate) {
            iziToast.show({
                message: `Please choose a date in the future`,
                position: 'topRight',
                messageColor: 'white',
                backgroundColor: '#f90909',


            });
        }
        else {
            dataStart.disabled = false;
            timeDeadline = userSelectedDate;
        }
    },
};


flatpickr("#datetime-picker", options);
function updateTimerInterface({ days, hours, minutes, seconds }) {
    dataDays.textContent = days.toString().padStart(2, '0');
    dataHours.textContent = hours.toString().padStart(2, '0');
    dataMinutes.textContent = minutes.toString().padStart(2, '0');
    dataSeconds.textContent = seconds.toString().padStart(2, '0');
}



dataStart.addEventListener('click', () => {
    dataStart.disabled = true;
    const intervalId = setInterval(() => {
        const currentDate = Date.now();
        const timeDifference = timeDeadline - currentDate;
        const timeLeft = convertMs(timeDifference);
        updateTimerInterface(timeLeft);

        if (timeDifference <= 1000) {
            clearInterval(intervalId);
            dataStart.disabled = false;
        }
    }, 1000);
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