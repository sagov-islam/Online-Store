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


// Фунция проверки корзины на пустоту
function checkForEmptyCart() {
    const cartProductsContainer = document.querySelector('.es-header__cart-products-list')
    const storage = JSON.parse(localStorage.getItem('products'))
    const html = `
    <div class="es-absence">
        <h3 class="es-absence__text">Товары отсутствуют</h3>
    </div>
    `
    if (!storage || storage.length == 0) {
        cartProductsContainer.innerHTML = html
    }
}



// Функция добавления стилей на кнопки <<Добавить в корзину>> карточек товара
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



// Функция добавления стилей на кнопку <<Добавить в избранное>> карточки товара
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



// Функция удаления продукта из корзины и обновления LocalStorage
function deleteCardFromLocalStorage(parent) {
    let storage = localStorage.getItem('products');
    if (storage) {
        storage = JSON.parse(storage)
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
    }
}



// Фунция добавления карточки товара в корзину
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
            <button class="es-btn-delete" onclick="deleteCardFromLocalStorage(this.parentNode), addLocalStorageProductsToCartPage(), updateQuantityProducts()">
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
            updateCartSum('es-specifications__value-sum');
        });
        
    }
}

// Функция обновления LocalStorage при использовании counter'а
function updateLocalStorageProducts(btn) {
    const counter = btn.parentNode.parentNode;
    const counterId = counter.dataset.id;
    const counterNum = counter.querySelector('.es-counter__count').textContent;
    let storage = localStorage.getItem('products');
    if (storage) {
        storage = JSON.parse(storage);
        storage.forEach(item => {
            if (item.id == counterId) {
                item.count = counterNum;
                localStorage.setItem('products', JSON.stringify(storage));
            }
        });
        updateCartSum('es-amount-sum');
        updateCartSum('es-specifications__value-sum');
        sumOfPaymentAndDelivery();
    }
}

// Функция обновления суммы всех товаров в корзине
function updateCartSum(container) {
    let storage = localStorage.getItem('products');
    let sumContainer = document.querySelector(`.${container}`);
    let sum = 0;

    if (sumContainer) {
        if (storage) {
            storage = JSON.parse(storage);
            storage.forEach(item => {
                sum += item.price * item.count;
            });
            sumContainer.textContent = `${sum} ₽`;
            sumOfPaymentAndDelivery();
        }
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
                        <button class="es-btn-delete es-cart__product-btn" onclick="deleteCardFromLocalStorage(this.parentNode.parentNode), addToCart(), updateQuantityProducts()">
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



// Функция обновляющая количество продуктов на странице корзингы
function updateQuantityProducts() {
    if (loc == '/cart.html') {
        let storage = localStorage.getItem('products');
        const container = document.querySelector('.es-specifications__key span')
        if (storage) {
            storage = JSON.parse(storage);
            const quantity = storage.length;
            container.textContent = quantity
        }

    }
};
updateQuantityProducts()



// Функция добавляющая предупреждения и уведомления
function addWarning(container, color, warningBlockId, text) {
    const modal = document.getElementById(`${container}`);
    const html = `
    <div class="es-absence es-absence--${color} es-margin-top" id="${warningBlockId}">
        <h3 class="es-absence__text">${text}</h3>
    </div>
    `
    modal.innerHTML += html
}



// Функция удаляющая предупреждения и уведомления
function deleteWarning(warningBlocks) {
    warningBlocks.forEach(item => {
        const warning = document.getElementById(`${item}`);
        if (warning) {
            warning.remove();
        }
    });
};



// Функция для формы регистрации
function signUp() {
    const modal = document.getElementById('es-modal-signUp')
    const form = modal.querySelector('#es-form-signUp');
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const storage = localStorage.getItem('user');
        
        if (!storage) {
            const formData = new FormData(form);
            const object = Object.fromEntries(formData.entries());
            object.loggedIn = false;
            localStorage.setItem('user', JSON.stringify(object))

            deleteWarning(['es-warning-signUp-error', 'es-warning-signUp-success']);
            addWarning('es-form-signUp', 'green', 'es-warning-signUp-success', 'Вы зарегистрировались');
        } else {
            deleteWarning(['es-warning-signUp-error', 'es-warning-signUp-success']);
            addWarning('es-form-signUp', 'red', 'es-warning-signUp-error', 'Вы уже зарегистрированы');
        }

        setTimeout(() => {
            deleteWarning(['es-warning-signUp-error', 'es-warning-signUp-success']);
            modal.classList.remove('es-show--animation')
            modal.classList.add('es-hide--animation')
        }, 2000);
    });
}



function signIn() {
    const modal = document.getElementById('es-modal-signIn')
    const form = modal.querySelector('#es-form-signIn');

    form.addEventListener('submit', (e) => {
        e.preventDefault()


        let storage = localStorage.getItem('user');
        const formData = new FormData(form);
        const object = Object.fromEntries(formData.entries());

        if (storage) {
            storage = JSON.parse(storage);
            if (storage.email === object.email && storage.password === object.password) {
                if (storage.loggedIn === false) {
                    deleteWarning(['es-warning-signIn-error', 'es-warning-signIn-success']);
                    addWarning('es-form-signIn', 'green', 'es-warning-signIn-success', 'Вы вошли в аккаунт');
                    storage.loggedIn = true;
                    localStorage.setItem('user', JSON.stringify(storage));
                    setTimeout(() => {
                        deleteWarning(['es-warning-signIn-error', 'es-warning-signIn-success']);
                        modal.classList.remove('es-show--animation')
                        modal.classList.add('es-hide--animation')
                    }, 2000);
                    checkLoggedInOrNot()
                }
            } else {
                deleteWarning(['es-warning-signIn-error', 'es-warning-signIn-success']);
                addWarning('es-form-signIn', 'red', 'es-warning-signIn-error', 'Вы неправильно ввели Email или пароль');
            }
        } else {
            deleteWarning(['es-warning-signIn-error', 'es-warning-signIn-success']);
            addWarning('es-form-signIn', 'red', 'es-warning-signIn-success', 'Вы еще не зарегистрированы');
            setTimeout(() => {
                deleteWarning(['es-warning-signIn-error', 'es-warning-signIn-success']);
                modal.classList.remove('es-show--animation')
                modal.classList.add('es-hide--animation')
            }, 2000);
        }


    });
}



function checkLoggedInOrNot() {
    let storage = localStorage.getItem('user');
    const dropDown = document.querySelector('#es-header-account-drop-down');
    if (storage) {
        storage = JSON.parse(storage)
        if (storage.loggedIn !== false) {
            dropDown.innerHTML = `
            <li class="es-drop-down__item ">
                <a class="es-text es-drop-down__link es-center" href="/account.html">В профиль</a>
            </li>
            <li class="es-drop-down__item ">
                <button class="es-text es-drop-down__link es-center" onclick="showModal('logOut')">Выйти из аккаунта</button>
            </li>
            `
        }  else {
            dropDown.innerHTML = `
            <li class="es-drop-down__item">
                <button class="es-text es-drop-down__link es-center" onclick="showModal('signUp')">Зарегистрироваться</button>
            </li>
            <li class="es-drop-down__item ">
                <button class="es-text es-drop-down__link es-center" onclick="showModal('signIn')">Войти</button>
            </li>
            `
        }
    }
}


// Функция для выхода из аккаунта
function logOut() {
    const modal = document.querySelector('#es-modal-logOut')
    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    const btn = form.querySelector('button');
    btn.addEventListener('click', () => {
        const storage = JSON.parse(localStorage.getItem('user'));
        storage.loggedIn = false;
        localStorage.setItem('user', JSON.stringify(storage));
        checkLoggedInOrNot();

        addWarning('es-form-logOut', 'green', 'es-warning-logOut-success', 'Вы вышли из аккаунта');
        setTimeout(() => {
            deleteWarning(['es-warning-logOut-success']);
            modal.classList.remove('es-show--animation')
            modal.classList.add('es-hide--animation')
        }, 2000);
    });
}


function showModal(modalName) {
    const modal = document.querySelector(`#es-modal-${modalName}`);
    modal.classList.remove('es-hide--animation')
    modal.classList.add('es-show--animation')
}


function stickyHeader() {
    const header = document.querySelector('.es-header');
    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;
        if (scrollPos > 0) {
            header.classList.add('sticky-header');
        } else {
            header.classList.remove('sticky-header');
        }
    });
}

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
        name: 'firstName',
        placeholder: 'Имя',
        required: true
    },
    {
        type: 'tel',
        name: 'number',
        placeholder: 'Телефон',
        required: true
    }
]).render();

// <<Регистрация>>
new Modal('signUp', 'Регистрация', 'Зарегистрироваться', [
    {
        type: 'text',
        name: 'firstName',
        placeholder: 'Имя',
        required: true
    },
    {
        type: 'text',
        name: 'lastName',
        placeholder: 'Фамилия',
        required: true
    },
    {
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        required: true
    },
    {
        type: 'password',
        name: 'password',
        placeholder: 'Пароль',
        required: true
    }
], signUp).render()


// <<Вход>>
new Modal('signIn', 'Вход', 'Войти', [
    {
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        required: true
    },
    {
        type: 'password',
        name: 'password',
        placeholder: 'Пароль',
        required: true
    }
], signIn).render();


new Modal('logOut', 'Вы уверены что хотите выйти из аккаунта?', 'Да', [], logOut).render();
