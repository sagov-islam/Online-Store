'use strict';

const starsList = document.querySelectorAll('.es-write-review__star');
const radioList = document.querySelectorAll('.es-write-review__radio');


// При наведение на звезду, все звезды идущие за этой звездой, приобредают hover эффект
starsList.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
        starsList.forEach(star => {
            star.classList.remove('es-star--hover');
        })
        for (let i = 0; i <= index; i++) {
            starsList[i].classList.add('es-star--hover');
        };
    });
});

// Если курсор покидает звезду, то все звезды лишаются hover эффекта
starsList.forEach((star) => {
    star.addEventListener('mouseout', () => {
        starsList.forEach(star => {
            star.classList.remove('es-star--hover');
        });
    });
});


// При клике на звезду, все звезды идущие за этой звездой, приобретают focus эффект
radioList.forEach((radio, index) => {
    radio.addEventListener('click', () => {
        starsList.forEach(star => {
            star.classList.remove('es-star--focus');
        });
        for (let i = 0; i <= index; i++) {
            starsList[i].classList.add('es-star--focus');
        };
    });
});