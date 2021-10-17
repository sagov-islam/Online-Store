import {Card} from "./card.js";

// Фильтрация элементов
Card('es-catalog__cards-container', 'Все категории', 'Все товары').render();
const radioButtons = document.getElementsByName('category');
const cardsContainer = document.querySelector('.es-catalog__cards-container');
radioButtons.forEach(item => {
    item.addEventListener('click', () => {
        cardsContainer.innerHTML = ''
        const category = item.parentNode.lastElementChild.textContent;

        Card('es-catalog__cards-container', category, 'Все товары').render().then(() => {
            const cardsCount = document.querySelector('.es-catalog__cards-container').children.length;
            if (cardsCount === 0) {
                cardsContainer.innerHTML = 'Контейнер пустой'
            }
        });
    });
});




// Анимация для элементов фильтра
const filterTitle = document.querySelectorAll(".es-filter__title");
filterTitle.forEach(item => {
    item.addEventListener('click', () => {
        item.nextElementSibling.classList.toggle('es-overflow-hide');
        item.nextElementSibling.classList.toggle('es-overflow-show');
        item.lastElementChild.classList.toggle('es-rotate180');
    });
});
