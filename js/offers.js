'use strict'



// Функция которая добавляет акции на страницу "Акции"
function addOffers() {
    const container = document.querySelector('.es-offers__list');
    function offerHtml(id, image, date, title) {
        return `
            <li class="es-offers__offer">
                <img class="es-offers__offer-image" src="${image}" alt="${title}">
                <span class="es-offers__offer-date">${date}</span>
                <a class="es-offers__offer-title es-title--h3" href="/offer.html" data-id="${id}" onclick="saveOfferId(this)" onauxclick="saveOfferId(this)">${title}</a>
                <a class="es-offers__offer-btn" href="/offer.html" data-id="${id}" onclick="saveOfferId(this)" onauxclick="saveOfferId(this)">Подробнее<img src="images/offer-arrow.png" alt="arrow"></a>
            </li>
        `
    }
    fetch('/database.json').then(data => data.json())
    .then(data => {
        data.offers.forEach(offer => {
            container.innerHTML += offerHtml(offer.id, offer.image, offer.date, offer.title)
        });
    });
}
if (window.location.pathname == '/offers.html') addOffers();



// Функция которая сохраняет id акции при нажатии на нее
function saveOfferId(btn) {
    const id = btn.dataset.id;
    localStorage.setItem('offerId', id);
}



window.onbeforeunload = () => {
    const id = parseInt(document.querySelector('.offer-content').dataset.id);
    localStorage.setItem('offerId', JSON.stringify(id));
}

function addOfferInformation() {
    const container = document.querySelector('.offer-container');
    const containerForCards = document.querySelector('.es-grid-container--card');
    const id = JSON.parse(localStorage.getItem('offerId'));
    function offerInformationHtml(id, title, date, text, cards) {
        return `
        <div class="es-breadcrumbs">
            <a href="/index.html">Главная</a> /
            <a href="/offers.html">Акции</a> /
            <span>${title}</span>
         </div>
         <section class="offer-content" data-id="${id}">
            <h1 class="es-title--h1">${title}</h1>
            <span class="es-offers__offer-date">${date}</span>
            <p class="es-text es-offer__text">${text}</p>
            <div class="es-grid-container--card es-offer__cards-container"></div>
        </section>
        `
    }
    fetch('/database.json').then(data => data.json())
    .then(data => {
        data.offers.forEach(offer => {
            if (offer.id === id) {
                container.innerHTML = offerInformationHtml(offer.id, offer.title, offer.date, offer.text);
                offer.productsId.forEach(productId => {
                    fetch('/database.json').then(data => data.json())
                    .then(data => {
                        data.cards.forEach(card => {
                            if (card.id == productId) {
                                new Card('es-grid-container--card', 'Все категории', 'Все бренды', card.id).render();
                            }
                        });
                    });
                });
            }
        });
    });
}