import {Card} from "./card.js";

// Карточки товара которые добавляются в каталог при загрузке страницы
Card('es-catalog__cards-list', 'Все категории', 'Все бренды', 'Все товары').render();


const cardsContainer = document.querySelector('.es-catalog__cards-list');
const categoryButtons = document.getElementsByName('category');
const brandButtons = document.getElementsByName('brand');
let category = 'Все категории';
let brand = 'Все бренды';

// Фильтрация по категориям
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cardsContainer.innerHTML = '';
        category = btn.parentNode.lastElementChild.textContent;

        // Карточки товара добавляются:
        Card('es-catalog__cards-list', category, brand,'Все товары').render()

        // Добавленные карточки фильтруются в соответствии с указанной желаемой ценой:
        .then(() => {
            const inputValue0 = parseInt(document.getElementById('input-0').value);
            const inputValue1 = parseInt(document.getElementById('input-1').value);
            const cards = document.querySelectorAll('.es-card');
            cards.forEach((card, id) => {
                let cardPrice = card.querySelector('.es-card-prices__price').innerHTML;
                cardPrice = parseInt(cardPrice.replace(/\D/g,''));
                if (cardPrice < inputValue0 || cardPrice > inputValue1) {
                    cards[id].remove();
                }
            });
        })

        // Потом идет проверка: если в контейнере нету элементов то визуально показать что товаров нет:
        .then(() => {
            const cardsAbsentBlock = document.querySelector('.es-catalog__cards-absent');
            let count = cardsContainer.children.length
            if (count === 0) {
                cardsAbsentBlock.classList.remove('es-hide');
                cardsAbsentBlock.classList.add('es-show--flex');
            } else {
                cardsAbsentBlock.classList.add('es-hide');
                cardsAbsentBlock.classList.remove('es-show--flex');
            }
        })
    });
});

// Фильтрация по брендам
brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cardsContainer.innerHTML = ''
        brand = btn.parentNode.lastElementChild.textContent;
        Card('es-catalog__cards-list', category, brand,'Все товары').render()

        .then(() => {
            const inputValue0 = parseInt(document.getElementById('input-0').value);
            const inputValue1 = parseInt(document.getElementById('input-1').value);
            const cards = document.querySelectorAll('.es-card');
            cards.forEach((card, id) => {
                let cardPrice = card.querySelector('.es-card-prices__price').innerHTML;
                cardPrice = parseInt(cardPrice.replace(/\D/g,''));
                if (cardPrice < inputValue0 || cardPrice > inputValue1) {
                    cards[id].remove();
                }
            });
        })

        .then(() => {
            const cardsAbsentBlock = document.querySelector('.es-catalog__cards-absent');
            let count = cardsContainer.children.length
            if (count === 0) {
                cardsAbsentBlock.classList.remove('es-hide');
                cardsAbsentBlock.classList.add('es-show--flex');
            } else {
                cardsAbsentBlock.classList.add('es-hide');
                cardsAbsentBlock.classList.remove('es-show--flex');
            }
        })
        
    });
});

// --- ПЕРЕНЕСТИ МЕТОД PRICEFILTER из card.js в filter.js
// Фильтрация по цене
const rangeSlider = document.getElementById('range-slider');
rangeSlider.noUiSlider.on('change', (values, handle) => {
    cardsContainer.innerHTML = ''
    Card('es-catalog__cards-list', category, brand,'Все товары').render().then(() => {
        const inputValue0 = parseInt(document.getElementById('input-0').value);
        const inputValue1 = parseInt(document.getElementById('input-1').value);
        const cards = document.querySelectorAll('.es-card');
        cards.forEach((card, id) => {
            let cardPrice = card.querySelector('.es-card-prices__price').innerHTML;
            cardPrice = parseInt(cardPrice.replace(/\D/g,''));
            if (cardPrice < inputValue0 || cardPrice > inputValue1) {
                cards[id].remove();
            }
        });
    });
});

// Фильтрация при вводе желаемой цены
const inputs = document.querySelectorAll('.es-filter__price-num');
inputs.forEach(input => {
    input.addEventListener('change', () => {
        cardsContainer.innerHTML = ''
        Card('es-catalog__cards-list', category, brand,'Все товары').render().then(() => {
            const inputValue0 = parseInt(document.getElementById('input-0').value);
            const inputValue1 = parseInt(document.getElementById('input-1').value);
            const cards = document.querySelectorAll('.es-card');
            cards.forEach((card, id) => {
                let cardPrice = card.querySelector('.es-card-prices__price').innerHTML;
                cardPrice = parseInt(cardPrice.replace(/\D/g,''));
                if (cardPrice < inputValue0 || cardPrice > inputValue1) {
                    cards[id].remove();
                }
            });
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