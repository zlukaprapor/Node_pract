
function calculateSurfaceArea(radius, height) {
    if (radius <= 0 || height <= 0) {
        return 0; // Помилка, якщо значення менше або рівне 0
    }
    return 2 * Math.PI * radius * (radius + height);
}


function showErrorModal(message) {
    alert(message);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('calc-form');
    const resultSpan = document.getElementById('result');
    const clearButton = document.getElementById('clear-form');
    const additionalInfoBlock = document.getElementById('additional-info');
    const showInfoCheckbox = document.getElementById('show-info');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Забороняємо стандартну відправку форми
        const radius = parseFloat(document.getElementById('radius').value);
        const height = parseFloat(document.getElementById('height').value);

        // Видаляємо попередні помилки та класи помилок
        const errorFields = document.querySelectorAll('.error-field');
        errorFields.forEach((field) => field.classList.remove('error-field'));
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach((message) => message.remove());

        if (isNaN(radius) || isNaN(height)) {
            showError('Будь ласка, введіть числові значення.');
            return;
        }

        if (radius <= 0 || height <= 0) {
            showError('Значення мають бути більше 0.');
            return;
        }

        const surfaceArea = calculateSurfaceArea(radius, height);
        resultSpan.textContent = surfaceArea;
        if (showInfoCheckbox.checked) {
            additionalInfoBlock.style.display = 'block';
        } else {
            additionalInfoBlock.style.display = 'none';
        }
    });

    clearButton.addEventListener('click', function () {
        form.reset(); // Очищення форми
        resultSpan.textContent = '---';
        additionalInfoBlock.style.display = 'none';
    });
    showInfoCheckbox.addEventListener('change', function () {
        if (showInfoCheckbox.checked) {
            additionalInfoBlock.style.display = 'block';
        } else {
            additionalInfoBlock.style.display = 'none';
        }
    });

    function showError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.classList.add('error-message');
        form.appendChild(errorMessage);
    }
});