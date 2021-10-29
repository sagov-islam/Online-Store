'use strict';

import {Card} from "/js/card.js";
const location = window.location.pathname;
if (location == "/index.html") {
    Card('es-leaders__cards-list', 'Лидеры продаж', 'Все бренды', [0,4]).render();
    Card('es-viewed-products__cards-list', 'Все категории', 'Все бренды', [0,4]).render();
}

if (location == "/product-page.html" || location == "/cart.html") {
    Card('es-viewed-products__cards-list', 'Все категории', 'Все бренды', [0,4]).render();
}

// Кнопка удаления товара
const btns = document.querySelectorAll('.es-btn-delete');
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentNode.remove();
    });
});
