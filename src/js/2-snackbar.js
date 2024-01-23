// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(this.elements.delay.value);
    const state = this.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise.then((delay) => {

        iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            messageColor: 'white',
            backgroundColor: '#83ca75',



        });
    }).catch((delay) => {

        iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
            messageColor: 'white',
            backgroundColor: '#e56e6e',

        });
    });
});