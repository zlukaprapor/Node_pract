// Отримуємо посилання на кнопку "Відкрити вікно" та спливаючі вікна
let openLogModalButton = document.getElementById('loginOpenModal');
let openRegModalButton = document.getElementById('registrationOpenModal');
let openMoreModalButton = document.getElementById('learnMoreOpenModal');
let loginModal = document.getElementById('loginModal');
let regModal = document.getElementById('regModal');
let moreModal = document.getElementById('moreModal');

// Отримуємо посилання на кнопку "х" для закриття
let closeModalButton = document.getElementsByClassName('close');

// Функція для відкриття спливаючого вікна
function openModal(modal) {
    modal.style.display = 'block';
    modal.classList.add('fade-in'); // Додаємо клас з анімацією відображення
}

// Функція для закриття спливаючих вікон
function closeModal(modal) {
    modal.classList.remove('fade-in'); // Видаляємо клас з анімацією відображення
    modal.style.display = 'none';
}

openLogModalButton.addEventListener('click', function() {
    openModal(loginModal);
});
openRegModalButton.addEventListener('click', function() {
    openModal(regModal);
});
openMoreModalButton.addEventListener('click', function() {
    openModal(moreModal);
});

// Додаємо обробник події для кнопок "х"
for (let i = 0; i < closeModalButton.length; i++) {
    closeModalButton[i].addEventListener('click', function() {
        closeModal(regModal);
        closeModal(loginModal);
        closeModal(moreModal);
    });
}

