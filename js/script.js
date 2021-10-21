import {Card} from "/js/card.js";

if (window.location.pathname == "/index.html") {
    Card('es-leaders__cards-list', 'Лидеры продаж', 'Все бренды', [0,4]).render();
    Card('es-viewed-products__cards-list', 'Все категории', 'Все бренды', [0,4]).render();
}

