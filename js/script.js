'use strict';

function checkForEmptyCart() {
    const html = `
    <div class="es-absence">
        <h3 class="es-absence__text">Товары отсутствуют</h3>
    </div>
    `
    const cartProductsContainer = document.querySelector('.es-header__cart-products-list')
    if (cartProductsContainer.children.length === 0) {
        cartProductsContainer.innerHTML = html
    }
}

function addStyleCheckedCardBtn(){
    const storage = JSON.parse(localStorage.getItem('products'));
    const cards = document.querySelectorAll('.es-card')
    if (storage) {
        cards.forEach(card => {
            const btn = card.querySelector('.es-btn-orange')
            const counter = card.querySelector('.es-counter');
            const counterArrow = counter.querySelectorAll('.es-counter__arrow')
            const count = card.querySelector('.es-counter__count');
            const text = btn.querySelector('span')

            btn.id = ''
            text.textContent = 'Добавить в корзину'
            btn.classList.remove('es-btn-orange--checked')
            counter.classList.remove('es-counter--checked')
            counterArrow[0].attributes.onclick.nodeValue = 'card.minusNumber(this)'
            counterArrow[1].attributes.onclick.nodeValue = 'card.plusNumber(this)'

            storage.forEach(item => {
                if (card.dataset.id === item.id) {

                    btn.id = 'checked'
                    text.textContent = 'Удалить из коризины'
                    btn.classList.add('es-btn-orange--checked')
                    count.textContent = item.count
                    counter.classList.add('es-counter--checked')
                    counterArrow[0].attributes.onclick.nodeValue = ''
                    counterArrow[1].attributes.onclick.nodeValue = ''
                }
            });
        });
    };
}
addStyleCheckedCardBtn()




function addStyleCheckedChosenBtn() {
    let storage = localStorage.getItem('chosen')
    const cards = document.querySelectorAll('.es-card')

    if (storage) {
        storage = JSON.parse(storage)
        cards.forEach(card => {
            const btn = card.querySelector('.es-btn-chosen')
            
            btn.id = ''
            btn.classList.remove('es-btn-chosen--checked')
            btn.classList.add('es-btn-chosen--hover')

            storage.forEach(item => {
                if (item.id === card.dataset.id) {
                    btn.id = 'checked'
                    btn.classList.add('es-btn-chosen--checked')
                    btn.classList.remove('es-btn-chosen--hover')
                }
            });

        });
    }
}
addStyleCheckedChosenBtn();


function deleteCardFromCart(btn) {
    let storage = localStorage.getItem('products');
    if (storage) {
        storage = JSON.parse(storage)
        const parent = btn.parentNode
        const parentId = parent.dataset.id
        parent.remove();
        storage.forEach((item, index) => {
            if (item.id === parentId) {
                storage.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(storage));
            }
        });
        checkForEmptyCart()
        addStyleCheckedCardBtn()
    }
    
}

function addToCart() {
    const container = document.querySelector('.es-header__cart-products-list')
    container.innerHTML = ''
    let storage = localStorage.getItem('products')

    const cardHtml = (id, name, price, discount, image, category) => {
        return `
        <li class="es-header__cart-products-item" data-id="${id}">
            <img class="es-header__cart-image" src="${image}"  alt="${category}">
            <div class="es-header__cart-info">
                <a class="es-header__cart-title" href="">${name}</a>
                <div class="es-card-prices">
                    <span class="es-card-prices__price es-cart-price">${price} ₽</span>
                    ${discount}
                </div>
            </div>
            <button class="es-btn-delete" onclick="deleteCardFromCart(this)">
                <svg class="es-btn-delete-icon" width="16" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.908239 1.8135C0.697254 1.60257 0.697254 1.25151 0.908239 1.0332C1.1266 0.822267 1.47038 0.822267 1.68874 1.0332L6.37223 5.72338L11.0636 1.0332C11.2746 0.822267 11.6257 0.822267 11.8362 1.0332C12.0546 1.25151 12.0546 1.60306 11.8362 1.8135L7.15273 6.49631L11.8362 11.1865C12.0546 11.3974 12.0546 11.7485 11.8362 11.9668C11.6252 12.1777 11.2741 12.1777 11.0636 11.9668L6.37223 7.27662L1.68874 11.9668C1.47038 12.1777 1.1266 12.1777 0.908239 11.9668C0.697254 11.7485 0.697254 11.3969 0.908239 11.1865L5.59173 6.49631L0.908239 1.8135Z"/>
                </svg>
            </button>
        </li>
        `
    }

    if (storage) {
        storage = JSON.parse(storage);
        fetch('/database.json')
        .then(data => data.json())
        .then(data => {
            storage.forEach(item => {
                data.cards.forEach(card => {
                    let discountHtml = ''
                    let price = card.price;
                    if (card.discount !== false) {
                        discountHtml = `
                        <span class="es-card-prices__old-price"><span class="es-card-prices__old-price-line"></span>${card.price} ₽</span>
                        <span class="es-card-prices__discount">-${card.discountPercent}%</span>
                        `
                        price = card.price * card.discount;
                    }

                    if (card.id == item.id) {
                        container.innerHTML += cardHtml(
                            card.id,
                            card.name,
                            price,
                            discountHtml,
                            card.images[0],
                            card.information.category
                        )
                    }
                });
            });
        })
        .then(() => {
            checkForEmptyCart()
        });
        
    }
}


function updateCartSum() {
    let storage = localStorage.getItem('products')
    let sumContainer = document.querySelector('.es-amount-sum');
    let sum = 0
    if (storage) {
        storage = JSON.parse(storage);
        storage.forEach(item => {
            sum += item.price
        });
        sumContainer.textContent = `${sum} ₽`
    }
}






const loc = window.location.pathname;
if (loc == "/index.html") {
    Card('es-leaders__cards-list', 'Лидеры продаж', 'Все бренды', [0,4]).render();
}

if (loc == "/index.html" || loc == "/product-page.html" || loc == "/cart.html") {
    Card('es-viewed-products__cards-list', 'Все категории', 'Все бренды', [0,4]).render();
}


// HEADER
new Header().render();


// МОДАЛЬНЫЕ ОКНА:
// <<Заказать звонок>>

new Modal('call', 'Заказать звонок', 'Отправить', [
    {
        type: 'text',
        name: 'Имя',
        placeholder: 'Имя',
        required: true
    },
    {
        type: 'tel',
        name: 'Телефон',
        placeholder: 'Телефон',
        required: true
    }
]).render();

// <<Регистрация>>
new Modal('register', 'Регистрация', 'Зарегистрироваться', [
    {
        type: 'text',
        name: 'Имя',
        placeholder: 'Имя',
        required: true
    },
    {
        type: 'text',
        name: 'Фамилия',
        placeholder: 'Фамилия',
        required: true
    },
    {
        type: 'email',
        name: 'Email',
        placeholder: 'Email',
        required: true
    },
    {
        type: 'password',
        name: 'Пароль',
        placeholder: 'Пароль',
        required: true
    }
]).render()


// <<Вход>>
new Modal('login', 'Вход', 'Войти', [
    {
        type: 'email',
        name: 'Email',
        placeholder: 'Email',
        required: true
    },
    {
        type: 'password',
        name: 'Пароль',
        placeholder: 'Пароль',
        required: true
    }
]).render();
