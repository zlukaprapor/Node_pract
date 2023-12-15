$(document).ready(function () {
    // Валідація форми реєстрації
    $("#registrationForm").validate({
        rules: {
            username: "required",
            email: {
                required: true,
                email: true
            },
            phone: {
                required: false,
                phone: true
            },
            password: {
                required: true,
                minlength: 5,
                strongPassword: true
            },
            confirmPassword: {
                required: true,
                equalTo: "#passwordReg"
            }
        },
        messages: {
            username: "Будь ласка, введіть ваше ім'я",
            email: "Будь ласка, введіть коректну електронну адресу",
            phone: "Номер телефону повинен містити 10 цифр",
            password: {
                required: "Будь ласка, введіть пароль",
                minlength: "Ваш пароль повинен бути не менше 5 символів"
            },
            confirmPassword: {
                required: "Будь ласка, введіть пароль ще раз",
                equalTo: "Паролі не співпадають"
            }
        }
    });

    // Додавання додаткових методів для валідації
    $.validator.addMethod("strongPassword", function (value, element) {
        return this.optional(element) || /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{5,}$/.test(value);
    }, "Пароль повинен містити цифри, спеціальні символи та літери");

    $.validator.addMethod("phone", function (value, element) {
        return this.optional(element) || /^\d{10}$/.test(value);
    }, "Номер телефону повинен містити 10 цифр");
});