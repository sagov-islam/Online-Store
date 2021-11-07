'use strict';
const database = fetch('../database.json').then(data => data.json());
const loc = window.location.pathname;


function minusNumber(btn) {
    const count = btn.nextElementSibling
    let countNum = count.innerHTML
    if (countNum <= 1) {
        countNum = 1
    } else {
        count.textContent = --countNum
    }
    updateLocalStorageProducts(btn)
}


function plusNumber(btn) {
    const count = btn.previousElementSibling
    let countNum = count.innerHTML
    count.textContent = ++countNum
    updateLocalStorageProducts(btn)
}



function checkForEmptyCart() {
    const btn = document.getElementById('cart-btn');
    const cartProductsContainer = document.querySelector('.es-header__cart-products-list')
    const cartProducts = document.querySelectorAll('.es-header__cart-products-item');
    const html = `
    <div class="es-absence">
        <h3 class="es-absence__text">Товары отсутствуют</h3>
    </div>
    `
    if (cartProducts.length === 0) {
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
            count.textContent = 1

            storage.forEach(item => {
                if (card.dataset.id === item.id) {

                    btn.id = 'checked'
                    text.textContent = 'Удалить из коризины'
                    btn.classList.add('es-btn-orange--checked')
                    count.textContent = item.count
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
        updateCartSum('es-amount-sum')
        addLocalStorageProductsToCartPage()
    }
    
}


function addToCart() {
    const container = document.querySelector('.es-header__cart-products-list')
    container.innerHTML = ''
    let storage = localStorage.getItem('products')

    const cardHtml = (id, name, price, discount, image, category, count) => {
        return `
        <li class="es-header__cart-products-item" data-id="${id}">
            <img class="es-header__cart-image" src="${image}"  alt="${category}">
            <div class="es-header__cart-info">
                <a class="es-header__cart-title" href="">${name}</a>
                <div class="es-card-prices">
                    <span class="es-card-prices__price es-cart-price">${price} ₽</span>
                    ${discount}
                </div>
                <div class="es-counter es-header__cart-counter" data-id="${id}">
                    <div class="es-counter__content">
                        <button class="es-counter__arrow es-counter__arrow-1" onclick="minusNumber(this), updateLocalStorageProducts(this), addLocalStorageProductsToCartPage()">
                            <svg class="es-counter__svg es-counter__svg-minus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                            </svg>
                        </button>
                        <span class="es-counter__count">${count}</span>
                        <button class="es-counter__arrow es-counter__arrow-2" onclick="plusNumber(this), updateLocalStorageProducts(this), addLocalStorageProductsToCartPage()">
                            <svg class="es-counter__svg es-counter__svg-plus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                            </svg>
                        </button>
                    </div>
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

        database.then(data => {
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
                            card.information.category,
                            item.count
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


function updateLocalStorageProducts(btn) {
    const counter = btn.parentNode.parentNode;
    const counterId = counter.dataset.id;
    const counterNum = counter.querySelector('.es-counter__count').textContent
    let storage = localStorage.getItem('products');
    if (storage) {
        storage = JSON.parse(storage);
        storage.forEach(item => {
            if (item.id == counterId) {
                item.count = counterNum
                localStorage.setItem('products', JSON.stringify(storage))
            }
        });
        updateCartSum('es-amount-sum')
        updateCartSum('es-specifications__value-sum')
        sumOfPaymentAndDelivery()
    }
}


function updateCartSum(container) {
    let storage = localStorage.getItem('products');
    let sumContainers = document.querySelectorAll(`.${container}`);
    let sum = 0;
    if (storage) {
        storage = JSON.parse(storage);
        storage.forEach(item => {
            sum += item.price * item.count;
        });
        sumContainers.forEach(item => {
            item.textContent = `${sum} ₽`;
        });
        sumOfPaymentAndDelivery();
    }
}
updateCartSum('es-specifications__value-sum');



function sumOfPaymentAndDelivery() {
    if (loc == '/cart.html') {
        const sumContainer = document.querySelector('.es-cart__sum');
        const values = document.querySelectorAll('.es-specifications__value');
        let sum = null
        values.forEach(item => {
            sum += parseInt(item.innerHTML.replace(/\D/ig, ''));
        });
        sumContainer.textContent = `${sum} ₽`
    };
    
}
sumOfPaymentAndDelivery()


function addLocalStorageProductsToCartPage() {
    if (loc == '/cart.html') {
        const container = document.querySelector('.es-cart__products');
        let storage = localStorage.getItem('products');
        container.innerHTML = ''
        if (storage) {
            storage = JSON.parse(storage)
            database.then(data => {
                storage.forEach(item => {
                    data.cards.forEach(card => {
                        if (item.id == card.id) {
                            let discountHtml = ''
                            let price = card.price;
                            if (card.discount !== false) {
                                discountHtml = `
                                <span class="es-card-prices__old-price"><span class="es-card-prices__old-price-line"></span>${card.price} ₽</span>
                                <span class="es-card-prices__discount">-${card.discountPercent}%</span>
                                `
                                price = card.price * card.discount;
                            }
                            container.innerHTML += cardHtml(
                                card.id,
                                card.name,
                                price,
                                discountHtml,
                                card.images[0],
                                card.information.category,
                                item.count
                            )
                        }
                    });
                });
            })
            
            const cardHtml = (id, name, price, discount, image, category, count) => {
                return `
                <li class="es-cart__product" data-id="${id}">
                    <div class="es-cart__product-main-content">
                        <img class="es-cart__product-img" src="${image}" alt="${category}">
                        <div class="es-cart__product-info">
                            <h3 class="es-title--h3 es-cart__product-title"><a href="#">${name}</a></h3>
                            <div class="es-card-prices es-cart__product-prices">
                                <span class="es-card-prices__price">${price} ₽</span>
                                ${discount}
                            </div>
                        </div>
                    </div>

                    <div class="es-cart__product-buttons-container">
                        <div class="es-counter es-cart__product-counter" data-id="${id}">
                            <div class="es-counter__content">
                                <button class="es-counter__arrow es-counter__arrow-1" onclick="minusNumber(this), updateLocalStorageProducts(this), addToCart(), updateCartSum('es-specifications__value-sum')">
                                    <svg class="es-counter__svg es-counter__svg-minus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                    </svg>
                                </button>
                                <span class="es-counter__count">${count}</span>
                                <button class="es-counter__arrow es-counter__arrow-2" onclick="plusNumber(this), updateLocalStorageProducts(this), addToCart(), updateCartSum('es-specifications__value-sum')">
                                    <svg class="es-counter__svg es-counter__svg-plus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button class="es-btn-delete es-cart__product-btn">
                            <svg class="es-btn-delete-icon" width="16" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.908239 1.8135C0.697254 1.60257 0.697254 1.25151 0.908239 1.0332C1.1266 0.822267 1.47038 0.822267 1.68874 1.0332L6.37223 5.72338L11.0636 1.0332C11.2746 0.822267 11.6257 0.822267 11.8362 1.0332C12.0546 1.25151 12.0546 1.60306 11.8362 1.8135L7.15273 6.49631L11.8362 11.1865C12.0546 11.3974 12.0546 11.7485 11.8362 11.9668C11.6252 12.1777 11.2741 12.1777 11.0636 11.9668L6.37223 7.27662L1.68874 11.9668C1.47038 12.1777 1.1266 12.1777 0.908239 11.9668C0.697254 11.7485 0.697254 11.3969 0.908239 11.1865L5.59173 6.49631L0.908239 1.8135Z"/>
                            </svg>
                        </button>
                    </div>
                    
                </li>
                `
            }
        }
    }
    
}
addLocalStorageProductsToCartPage()






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
