$(document).ready(function () {
    // Отримуємо посилання на кнопку "Відкрити вікно" та модальне вікно форми
    let openFeedbackModalButton = document.getElementById('openFeedbackModal');
    let feedbackModal = document.getElementById('feedbackModal');

    // Отримуємо посилання на кнопку "х" для закриття
    let closeModalButton = document.getElementsByClassName('close');

    // Функція для відкриття модального вікна
    openFeedbackModalButton.addEventListener('click', function () {
        feedbackModal.style.display = 'block';
    });

    // Функція для закриття модального вікна
    for (let i = 0; i < closeModalButton.length; i++) {
        closeModalButton[i].addEventListener('click', function () {
            feedbackModal.style.display = 'none';
        });
    }

    // Валідація форми зворотного зв'язку
    $("#feedbackForm").validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            subject: "required",
            message: "required"
        },
        messages: {
            name: "Будь ласка, введіть ваше ім'я",
            email: {
                required: "Будь ласка, введіть коректну електронну адресу",
                email: "Будь ласка, введіть коректну електронну адресу"
            },
            subject: "Будь ласка, введіть тему повідомлення",
            message: "Будь ласка, введіть текст повідомлення"
        },
        submitHandler: function (form) {
            // Симуляція відправлення форми (замініть це реальною логікою відправлення форми на сервер)
            setTimeout(function () {
                $("#feedbackForm").hide();
                $("#successMessage").fadeIn();
            }, 1000);
        }
    });
});