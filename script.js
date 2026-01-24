document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('feedbackFormContainer');
    if (!formContainer) return console.error('Form container not found!');

    document.getElementById('feedbackToggleBtn').addEventListener('click', () => {
        console.log(123)
        formContainer.classList.toggle('visible1')
    });

    const formzayavka = document.getElementById('feedback');
    if (!formzayavka) return console.error('Form zayavka not found!');

    document.getElementById('zayavka-show-all')?.addEventListener('click', () => 
        formzayavka.classList.toggle('visible1')
    );
    
    document.getElementById('closeFeedbackForm')?.addEventListener('click', (e) => {
        e.stopPropagation();
        formContainer.classList.remove('visible1');
    });
    
    document.getElementById('feedbackFormHeader')?.addEventListener('click', (e) => 
        e.target === e.currentTarget && formContainer.classList.remove('visible1')
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