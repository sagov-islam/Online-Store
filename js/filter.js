'use strict';

const cardsContainer = document.querySelector('.es-catalog__cards-list');
const categoryButtons = document.getElementsByName('category');
const brandButtons = document.getElementsByName('brand');
const btnMoreCards = document.querySelector('.es-catalog-more-cards');
let category = 'Все категории';
let brand = 'Все бренды';
let indexForCard = 8
let arrayForCards = []


function filter() {
    indexForCard = 8
    cardsContainer.innerHTML = '';
    arrayForCards = []
    const inputValue0 = parseInt(document.getElementById('input-0').value);
    const inputValue1 = parseInt(document.getElementById('input-1').value);
    
    const cards = document.querySelectorAll('.es-card');
    fetch('../database.json').then(data => data.json())
    .then((data) => {
        data.cards.forEach((card)=> {
            let price = card.price;
            let cardId = parseInt(card.id)
            if (card.discount !== false) price = card.price * card.discount;
            if (price >= inputValue0 && price <= inputValue1) {
                new Card('es-catalog__cards-list', category, brand, cardId).render()
                .then(() => {
                    showBtnMoreCards();
                    ifNoProducts();

                    const cards = document.querySelectorAll('.es-card');
                    cards.forEach((card, cardIndex) => {
                        if (cardIndex > 8)  {
                            arrayForCards.push(card);
                            card.remove();
                        }
                    });
                });
            }
        });
    })
}


// Кнопка <<Больше товаров>>
btnMoreCards.addEventListener('click', () => {
    arrayForCards.forEach((card, index) => {
        if (index <= indexForCard) {
            cardsContainer.append(card)
            delete arrayForCards[index]
        }
    });
    indexForCard += 9
});




// Если количество карточек больше 9, то появляется кнопка <<Больше товаров>>
function showBtnMoreCards() {
    const btnMoreCards = document.querySelector('.es-catalog-more-cards');
    let count = document.querySelectorAll('.es-card').length
    
    if (count > 9) {
        btnMoreCards.classList.remove('es-hide');
        btnMoreCards.classList.add('es-show--block');
    } else {
        btnMoreCards.classList.remove('es-show--block');
        btnMoreCards.classList.add('es-hide');
    }
};



// Фильтрация по категориям
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        category = btn.parentNode.lastElementChild.textContent;
        filter();
    });
});



// Фильтрация по брендам
brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        brand = btn.parentNode.lastElementChild.textContent;
        filter();
    });
});



// Фильтрация при вводе желаемой цены
const inputs = document.querySelectorAll('.es-filter__price-num');
inputs.forEach(input => {
    input.addEventListener('change', () => {
        filter();
    });
});



// Фильтрация по цене
const rangeSlider = document.getElementById('range-slider');
rangeSlider.noUiSlider.on('change', (values, handle) => {
    filter();
});