function findDigitsInWords() {
    const inputText = document.getElementById('inputText').value;
    const regex = /\b\d+\b/g;
    const matches = inputText.match(regex);
    const output = document.getElementById('output');
    output.textContent = "Знайдені цифри в словах: " + (matches ? matches.join(', ') : 'немає співпадінь');
}

function findValidIPs() {
    const inputText = document.getElementById('inputTextTaskTwo').value;
    const regex = /\b\d{1,3}\.0\.\d{1,3}\.\d{1,3}\b/g;
    const matches = inputText.match(regex);
    const output = document.getElementById('outputTaskTwo');
    output.textContent = "Знайдені IP-адреси: " + (matches ? matches.join(', ') : 'немає співпадінь');
}

function checkPhoneNumberValidity(input) {
    const regex = /^\+\d{2}-\d{3}-\d{3}-\d{2}-\d{2}$/;
    if (regex.test(input.value)) {
        input.style.border = "2px solid green";
    } else {
        input.style.border = "2px solid red";
    }
}
function checkFacebookLinkValidity(input) {
    const regex = /https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9]+/;
    if (regex.test(input.value)) {
        input.style.border = "2px solid green";
    } else {
        input.style.border = "2px solid red";
    }
}