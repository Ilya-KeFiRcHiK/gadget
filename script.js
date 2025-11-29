document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('feedbackFormContainer');
    if (!formContainer) return console.error('Form container not found!');

    document.getElementById('feedbackToggleBtn')?.addEventListener('click', () => 
        formContainer.classList.toggle('visible')
    );

    const formzayavka = document.getElementById('feedback');
    if (!formzayavka) return console.error('Form zayavka not found!');

    document.getElementById('zayavka-show-all')?.addEventListener('click', () => 
        formzayavka.classList.toggle('visible')
    );
    
    document.getElementById('closeFeedbackForm')?.addEventListener('click', (e) => {
        e.stopPropagation();
        formContainer.classList.remove('visible');
    });
    
    document.getElementById('feedbackFormHeader')?.addEventListener('click', (e) => 
        e.target === e.currentTarget && formContainer.classList.remove('visible')
    );
    
    const nameInput = document.getElementById('name');
    const nameHint = document.getElementById('name-hint');
    nameInput?.addEventListener('input', () => {
        const value = nameInput.value;
        const isValid = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value) && value.length <= 12;
        nameHint.textContent = isValid ? '' : 
            !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value) ? 'Только буквы разрешены' : 'Максимум 12 символов';
        nameInput.style.borderColor = isValid ? '#ddd' : 'red';
    });
});

document.querySelector("#menu-toggle").addEventListener("click", function(e){
    const menuList = document.querySelector(".menu-list");
    if (menuList.classList.contains('show')) {
        menuList.classList.remove("show");
    } else {
        menuList.classList.add("show");
    }
});

const title = document.getElementById('title');
const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const btn = document.getElementById('submit-btn');

const titleHint = document.getElementById('title-hint');
const nameHint = document.getElementById('name-hint');
const emailHint = document.getElementById('email-hint');
const messageHint = document.getElementById('message-hint');

const maxWords = 255;

[title, nameInput, email, message].forEach(input => {
input.addEventListener('paste', e => e.preventDefault());
input.addEventListener('contextmenu', e => e.preventDefault());
});

function validate() {
    let valid = true;
    if (title.value.trim().length === 0) {
        title.className = 'invalid';
        titleHint.textContent = 'Поле обязательно';
        titleHint.style.color = 'red';
        valid = false;
    } else {
        title.className = 'valid';
        titleHint.textContent = 'Ок';
        titleHint.style.color = 'green';
    }

    const nameValue = nameInput.value.trim();
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z]{1,12}$/;

    if (!nameRegex.test(nameValue)) {
        nameInput.className = 'invalid';
        nameHint.textContent = `Недопустимые символы или длина. Осталось ${12 - nameValue.length} символов.`;
        nameHint.style.color = 'red';
        valid = false;
    } else {
        nameInput.className = 'valid';
        nameHint.textContent = 'Имя корректно';
        nameHint.style.color = 'green';
    }

    if (!email.value.includes('@')) {
        email.className = 'invalid';
        emailHint.textContent = 'Неверный email (отсутствует @)';
        emailHint.style.color = 'red';
        valid = false;
    } else {
        email.className = 'valid';
        emailHint.textContent = 'Email корректен';
        emailHint.style.color = 'green';
    }

    const wordCount = message.value.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount === 0) {
        message.className = 'invalid';
        messageHint.textContent = 'Введите сообщение';
        messageHint.style.color = 'red';
        valid = false;
    } else if (wordCount > maxWords) {
        message.className = 'invalid';
        messageHint.textContent = `Слишком много слов: ${wordCount}/${maxWords}`;
        messageHint.style.color = 'red';
        valid = false;
    } else {
        message.className = 'valid';
        messageHint.textContent = `Слов: ${wordCount}/${maxWords}`;
        messageHint.style.color = 'green';
    }

    btn.disabled = !valid;
}

[title, nameInput, email, message].forEach(input => {
    input.addEventListener('input', validate);
});

[title, nameInput, email, message].forEach(input => {
    input.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
            e.preventDefault();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('callback-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submit-btn');
    const messageEl = document.getElementById('form-message');
    
    // Валидация имени
    function validateName() {
        const value = nameInput.value.trim();
        const regex = /^[а-яА-ЯёЁa-zA-Z]{1,12}$/;
        
        if (!value) {
            return { valid: false, message: 'Поле обязательно' };
        }
        
        if (!regex.test(value)) {
            const remaining = 12 - value.length;
            return { 
                valid: false, 
                message: remaining > 0 
                    ? `Осталось ${remaining} символов` 
                    : 'Максимум 12 символов'
            };
        }
        
        return { valid: true, message: 'Корректно' };
    }
    
    // Валидация телефона
    function validatePhone() {
        const value = phoneInput.value.trim();
        const regex = /^\+7\s?[\(]?\d{3}[\)]?\s?\d{3}[-]?\d{2}[-]?\d{2}$/;
        
        if (!value) {
            return { valid: false, message: 'Поле обязательно' };
        }
        
        if (!regex.test(value)) {
            return { valid: false, message: 'Формат: +7 (XXX) XXX-XX-XX' };
        }
        
        return { valid: true, message: 'Корректно' };
    }
    
    // Общая валидация формы
    function validateForm() {
        const nameValid = validateName();
        const phoneValid = validatePhone();
        
        // Обновляем подсказки
        document.getElementById('name-hint').textContent = nameValid.message;
        document.getElementById('name-hint').style.color = nameValid.valid ? 'green' : 'red';
        
        document.getElementById('phone-hint').textContent = phoneValid.message;
        document.getElementById('phone-hint').style.color = phoneValid.valid ? 'green' : 'red';
        
        // Активируем/деактивируем кнопку
        submitBtn.disabled = !(nameValid.valid && phoneValid.valid);
        
        return nameValid.valid && phoneValid.valid;
    }
    
    // Маска для телефона
    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '+7' + value.substring(1);
        }
        this.value = value;
        validateForm();
    });
    
    // Валидация при вводе
    nameInput.addEventListener('input', validateForm);
    phoneInput.addEventListener('input', validateForm);
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Показываем загрузку
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Собираем данные
        const formData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim()
        };
        
        // Отправляем на сервер (замените URL на ваш)
        fetch('callback.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('success', 'Спасибо! Мы скоро вам перезвоним.');
                form.reset();
            } else {
                showMessage('error', data.message || 'Ошибка отправки');
            }
        })
        .catch(error => {
            showMessage('error', 'Ошибка соединения');
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            validateForm();
        });
    });
    
    function showMessage(type, text) {
        messageEl.textContent = text;
        messageEl.className = `form-message ${type}`;
        messageEl.style.display = 'block';
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
    
    // Первичная валидация
    validateForm();
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('callback-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submit-btn');
    const messageEl = document.getElementById('form-message');
    
    // Валидация имени
    function validateName() {
        const value = nameInput.value.trim();
        const regex = /^[а-яА-ЯёЁa-zA-Z]{1,12}$/;
        
        if (!value) {
            return { valid: false, message: 'Поле обязательно' };
        }
        
        if (!regex.test(value)) {
            const remaining = 12 - value.length;
            return { 
                valid: false, 
                message: remaining > 0 
                    ? `Осталось ${remaining} символов` 
                    : 'Максимум 12 символов'
            };
        }
        
        return { valid: true, message: 'Корректно' };
    }
    
    // Валидация телефона
    function validatePhone() {
        const value = phoneInput.value.trim();
        const regex = /^\+7\s?[\(]?\d{3}[\)]?\s?\d{3}[-]?\d{2}[-]?\d{2}$/;
        
        if (!value) {
            return { valid: false, message: 'Поле обязательно' };
        }
        
        if (!regex.test(value)) {
            return { valid: false, message: 'Формат: +7 (XXX) XXX-XX-XX' };
        }
        
        return { valid: true, message: 'Корректно' };
    }
    
    // Общая валидация формы
    function validateForm() {
        const nameValid = validateName();
        const phoneValid = validatePhone();
        
        // Обновляем подсказки
        document.getElementById('name-hint').textContent = nameValid.message;
        document.getElementById('name-hint').style.color = nameValid.valid ? 'green' : 'red';
        
        document.getElementById('phone-hint').textContent = phoneValid.message;
        document.getElementById('phone-hint').style.color = phoneValid.valid ? 'green' : 'red';
        
        // Активируем/деактивируем кнопку
        submitBtn.disabled = !(nameValid.valid && phoneValid.valid);
        
        return nameValid.valid && phoneValid.valid;
    }
    
    // Маска для телефона
    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '+7' + value.substring(1);
        }
        this.value = value;
        validateForm();
    });
    
    // Валидация при вводе
    nameInput.addEventListener('input', validateForm);
    phoneInput.addEventListener('input', validateForm);
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Показываем загрузку
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Собираем данные
        const formData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim()
        };
        
        // Отправляем на сервер (замените URL на ваш)
        fetch('callback.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('success', 'Спасибо! Мы скоро вам перезвоним.');
                form.reset();
            } else {
                showMessage('error', data.message || 'Ошибка отправки');
            }
        })
        .catch(error => {
            showMessage('error', 'Ошибка соединения');
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            validateForm();
        });
    });
    
    function showMessage(type, text) {
        messageEl.textContent = text;
        messageEl.className = `form-message ${type}`;
        messageEl.style.display = 'block';
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
    
    // Первичная валидация
    validateForm();
});
