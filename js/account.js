'use strict';

// Функционал кнопок
const btns = document.querySelectorAll('.es-account__btn');
const cartContainer = document.querySelector('#es-cart-container');
const chosenContainer = document.querySelector('#es-chosen-container');
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btns.forEach(item => {
            item.classList.remove('es-account__btn--checked');
            item.classList.add('es-account__btn--hover');
        });
        cartContainer.classList.add('es-hide'), chosenContainer.classList.add('es-hide');

        if (btn.textContent === 'Корзина') cartContainer.classList.remove('es-hide');
        else if (btn.textContent === 'Избранное') chosenContainer.classList.remove('es-hide');
        btn.classList.add('es-account__btn--checked');
        btn.classList.remove('es-account__btn--hover');
    });
    if (btn.textContent === 'Избранное') btn.classList.add('es-account__btn--checked'), btn.classList.remove('es-account__btn--hover');
});


// Имя пользователя
let user = localStorage.getItem('user');
const userNameContainer = document.querySelector('.es-account__user-name');
if (user) {
    user = JSON.parse(user);
    userNameContainer.textContent = `${user.firstName} ${user.lastName}`;
} else {
    userNameContainer.textContent = 'Гость'
}