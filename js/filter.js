import {Card} from "./card.js";

const cardsContainer = document.querySelector('.es-catalog__cards-list');
const categoryButtons = document.getElementsByName('category');
const brandButtons = document.getElementsByName('brand');
const btnMoreCards = document.querySelector('.es-catalog-more-cards');
let category = 'Все категории';
let brand = 'Все бренды';
let num1 = 9;

// Карточки товара которые добавляются в каталог при загрузке страницы
Card('es-catalog__cards-list', 'Все категории', 'Все бренды', [0,9]).render().then(() => {
    btnMoreCards.classList.remove('es-hide');
    btnMoreCards.classList.add('es-show--block');
});

// Фильтрация по категориям
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cardsContainer.innerHTML = '';
        category = btn.parentNode.lastElementChild.textContent;

        // Карточки товара добавляются:
        Card('es-catalog__cards-list', category, brand, [0,9]).render()

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
            const btnMoreCards = document.querySelector('.es-catalog-more-cards');
            let count = document.querySelectorAll('.es-card').length
            if (count === 0) {
                cardsAbsentBlock.classList.remove('es-hide');
                cardsAbsentBlock.classList.add('es-show--flex');
            } else {
                cardsAbsentBlock.classList.add('es-hide');
                cardsAbsentBlock.classList.remove('es-show--flex');
            }

            // Если количество карточек  больше либо равно 9, то появляется кнопка <<Больше товаров>>
            if (count >= 9) {
                btnMoreCards.classList.remove('es-hide');
                btnMoreCards.classList.add('es-show--block');
            } else {
                btnMoreCards.classList.remove('es-show--block');
                btnMoreCards.classList.add('es-hide');
            }
        })
        num1 = 9;
    });
});

// Фильтрация по брендам
brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cardsContainer.innerHTML = ''
        brand = btn.parentNode.lastElementChild.textContent;
        Card('es-catalog__cards-list', category, brand, [0,9]).render()

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
            const btnMoreCards = document.querySelector('.es-catalog-more-cards');
            let count = document.querySelectorAll('.es-card').length
            if (count === 0) {
                cardsAbsentBlock.classList.remove('es-hide');
                cardsAbsentBlock.classList.add('es-show--flex');
            } else {
                cardsAbsentBlock.classList.add('es-hide');
                cardsAbsentBlock.classList.remove('es-show--flex');
            }

            if (count >= 9) {
                btnMoreCards.classList.remove('es-hide');
                btnMoreCards.classList.add('es-show--block');
            } else {
                btnMoreCards.classList.remove('es-show--block');
                btnMoreCards.classList.add('es-hide');
            }
        })
        num1 = 9;
        
    });
});

// Фильтрация по цене
const rangeSlider = document.getElementById('range-slider');
rangeSlider.noUiSlider.on('change', (values, handle) => {
    cardsContainer.innerHTML = ''
    Card('es-catalog__cards-list', category, brand, [0,9]).render()
    
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
        const btnMoreCards = document.querySelector('.es-catalog-more-cards');
        let count = document.querySelectorAll('.es-card').length
        if (count === 0) {
            cardsAbsentBlock.classList.remove('es-hide');
            cardsAbsentBlock.classList.add('es-show--flex');
        } else {
            cardsAbsentBlock.classList.add('es-hide');
            cardsAbsentBlock.classList.remove('es-show--flex');
        }

        if (count >= 9) {
            btnMoreCards.classList.remove('es-hide');
            btnMoreCards.classList.add('es-show--block');
        } else {
            btnMoreCards.classList.remove('es-show--block');
            btnMoreCards.classList.add('es-hide');
        }
    });
    num1 = 9;

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
        })
        .then(() => {
            const cardsAbsentBlock = document.querySelector('.es-catalog__cards-absent');
            const btnMoreCards = document.querySelector('.es-catalog-more-cards');
            let count = document.querySelectorAll('.es-card').length
            if (count === 0) {
                cardsAbsentBlock.classList.remove('es-hide');
                cardsAbsentBlock.classList.add('es-show--flex');
            } else {
                cardsAbsentBlock.classList.add('es-hide');
                cardsAbsentBlock.classList.remove('es-show--flex');
            }

            if (count >= 9) {
                btnMoreCards.classList.remove('es-hide');
                btnMoreCards.classList.add('es-show--block');
            } else {
                btnMoreCards.classList.remove('es-show--block');
                btnMoreCards.classList.add('es-hide');
            }
        });
        num1 = 9;

    });
});

btnMoreCards.addEventListener('click', () => {
    Card('es-catalog__cards-list', category, brand, [num1,9]).render()
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
    num1 += 9
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