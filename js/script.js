(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

const targetDate = new Date("december 31, 2025 23:59:59").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerText = "00:00:00:00";
    document.getElementById("countdown").style.color = "#ff0000";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Форматирование с ведущими нулями
  const formattedDays = days.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  document.getElementById("countdown").innerText =
    `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);


document.querySelector("#menu-toggle").addEventListener("click", function(e){
    const menuList = document.querySelector(".menu-list");
    if (menuList.classList.contains('show')) {
        menuList.classList.remove("show");
    } else {
        menuList.classList.add("show");
    }
});


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