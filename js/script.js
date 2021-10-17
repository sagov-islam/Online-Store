import {Card} from "../js/card.js";

if (window.location.pathname == "/index.html") {
    Card('es-leaders__cards-list', 'Лидеры продаж', 4).render();
    Card('es-viewed-products__cards-list', 'Все категории', 4).render();
}
