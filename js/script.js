import {Card} from "../blocks/card/card.js";

if (window.location.pathname == "/index.html") {
    Card('es-leaders__cards-list', 'Лидеры', 4).render();
    Card('es-viewed-products__cards-list', 'Все категории', 4).render();
}
if (window.location.pathname == "/catalog.html") {
    Card('es-catalog__cards-container', 'Все категории', 4).render();
}
