import {Card} from "./card.js";

const cardsContainer = document.querySelector('.es-catalog__cards-list');
const categoryButtons = document.getElementsByName('category');
const brandButtons = document.getElementsByName('brand');
const btnMoreCards = document.querySelector('.es-catalog-more-cards');
let category = 'Все категории';
let brand = 'Все бренды';
let numForBtnMore = 9;

// Карточки товара которые добавляются в каталог при загрузке страницы
Card('es-catalog__cards-list', 'Все категории', 'Все бренды', [0,9]).render().then(() => {
    btnMoreCards.classList.remove('es-hide');
    btnMoreCards.classList.add('es-show--block');
});


// --------- ФУНКЦИИ --------- \\
// Функция которая проверяет: если в контейнере нету элементов то визуально показать что товаров нет:
const ifNoProducts = () => {
    const cardsAbsentBlock = document.querySelector('.es-catalog__cards-absent');
    let count = document.querySelectorAll('.es-card').length
    if (count === 0) {
        cardsAbsentBlock.classList.remove('es-hide');
        cardsAbsentBlock.classList.add('es-show--flex');
    } else {
        cardsAbsentBlock.classList.add('es-hide');
        cardsAbsentBlock.classList.remove('es-show--flex');
    }

};

// Функция которая проверяет: Если количество карточек больше либо равно 9, то появляется кнопка <<Больше товаров>>
const showBtnMoreCards = () => {
    const btnMoreCards = document.querySelector('.es-catalog-more-cards');
    let count = document.querySelectorAll('.es-card').length
    
    if (count >= 9) {
        btnMoreCards.classList.remove('es-hide');
        btnMoreCards.classList.add('es-show--block');
    } else {
        btnMoreCards.classList.remove('es-show--block');
        btnMoreCards.classList.add('es-hide');
    }
};

// Функция которая фильтрует карточки товара в соответствии с указанной желаемой ценой
const filtrationDesiredPrice = () => {
    const inputValue0 = parseInt(document.getElementById('input-0').value);
    const inputValue1 = parseInt(document.getElementById('input-1').value);
    const cards = document.querySelectorAll('.es-card');
    cards.forEach((card, index) => {
        let cardPrice = card.querySelector('.es-card-prices__price').innerHTML;
        cardPrice = parseInt(cardPrice.replace(/\D/g,''));
        if (cardPrice < inputValue0 || cardPrice > inputValue1) {
            cards[index].remove();
        }
    });
};
// --------- ФУНКЦИИ --------- \\



// Фильтрация по категориям
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cardsContainer.innerHTML = '';
        category = btn.parentNode.lastElementChild.textContent;

        Card('es-catalog__cards-list', category, brand, [0,9]).render()
        .then(() => {
            filtrationDesiredPrice();
        })
        .then(() => {
            ifNoProducts();
            showBtnMoreCards();
            numForBtnMore = 9;
        })
    });
});


// Фильтрация по брендам
brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cardsContainer.innerHTML = ''
        brand = btn.parentNode.lastElementChild.textContent;
        Card('es-catalog__cards-list', category, brand, [0,9]).render()
        .then(() => {
            filtrationDesiredPrice();
        })
        .then(() => {
            ifNoProducts();
            showBtnMoreCards();
            numForBtnMore = 9;
        })
    });
});


// Фильтрация по цене
const rangeSlider = document.getElementById('range-slider');
rangeSlider.noUiSlider.on('change', (values, handle) => {
    cardsContainer.innerHTML = ''
    Card('es-catalog__cards-list', category, brand, [0,9]).render()
    .then(() => {
        filtrationDesiredPrice();
    })
    .then(() => {
        ifNoProducts();
        showBtnMoreCards();
        numForBtnMore = 9;
    })

});


// Фильтрация при вводе желаемой цены
const inputs = document.querySelectorAll('.es-filter__price-num');
inputs.forEach(input => {
    input.addEventListener('change', () => {
        cardsContainer.innerHTML = ''
        Card('es-catalog__cards-list', category, brand,'Все товары').render()

        .then(() => {
            filtrationDesiredPrice();
        })

        .then(() => {
            ifNoProducts();
            showBtnMoreCards();
            numForBtnMore = 9;
        })
    });
});


// Кнопка <<Больше товаров>>
btnMoreCards.addEventListener('click', () => {
    Card('es-catalog__cards-list', category, brand, [numForBtnMore,9]).render()
    .then(() => {
        filtrationDesiredPrice();
        numForBtnMore += 9;
    })
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