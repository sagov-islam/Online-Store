'use strict';
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



// Добавляет стиль checked для кнопки <<Добавить в корзину>> на странице продукта, если этот продукт есть в LocalStorage
function updateStyleForProductPageBtn() {
    if (loc == '/product-page.html') {
        let storage = localStorage.getItem('products');
        const parent = document.querySelector('.es-product__information');
        const btn = parent.querySelector('.es-product-btn-add-to-card')
        const text = btn.querySelector('.es-btn-orange__text');
        const id = parent.dataset.id;
        const price = parent.querySelector('.es-product__prices-price').textContent;
        const count = parent.querySelector('.es-counter__count');
        btn.id = '';
        text.textContent = 'Добавить в корзину';
        btn.classList.remove('es-btn-orange--checked');

        if (storage) {
            storage = JSON.parse(storage);
            storage.forEach((item, index) => {
                if (item.id == id) {
                    btn.id = 'checked';
                    count.textContent = item.count;
                    text.textContent = 'Удалить из корзины';
                    btn.classList.add('es-btn-orange--checked');
                }
            });
        }
    };
    
}

function updateQuantityProductsOnCartBtn() {
    const container = document.querySelector('.es-header__cart-btn');
    const countContainer = document.querySelector('#cart-quantity-products');
    const cartBg = document.querySelector('.es-header__cart-bg-1');
    let storage = localStorage.getItem('products');

    if (storage) {
        storage = JSON.parse(storage);

        if (storage.length > 0) {
            if (countContainer) countContainer.remove();
            container.innerHTML += `<span class="es-header__quantity-products" id="cart-quantity-products">${storage.length}</span>`;
            cartBg.classList.add('es-show--block');
            cartBg.classList.remove('es-hide');
        } else {
            if (countContainer) countContainer.remove();
            cartBg.classList.remove('es-show--block');
            cartBg.classList.add('es-hide');
        }
    } else {
        if (countContainer) countContainer.remove();
        cartBg.classList.remove('es-show--block');
        cartBg.classList.add('es-hide');
    }
}



function udateQuantityProductsOnChosenBtn() {
    let storage = localStorage.getItem('chosen');
    const container = document.querySelector('.es-header__chosen-btn');
    const countContainer = document.querySelector('#chosen-quantity-products');
    if (storage) {
        storage = JSON.parse(storage);
        if (storage.length > 0) {
            if (countContainer) countContainer.remove();
            container.innerHTML += `<span class="es-header__quantity-products" id="chosen-quantity-products">${storage.length}</span>`;
        } else {
            if (countContainer) countContainer.remove();
        }
    } else {
        if (countContainer) countContainer.remove();
    }
}





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
        addStyleCheckedCardBtn();
        updateCartSum('es-amount-sum');
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
                <a class="es-header__cart-title" href="/product-page.html" target="_blank" onclick="saveСardId(this), saveIdViewedProduct(${id})" onauxclick="saveСardId(this), saveIdViewedProduct(${id})" data-id="${id}">${name}</a>
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
            <button class="es-btn-delete" onclick="deleteCardFromLocalStorage(this.parentNode), addLocalStorageProductsToCartPage(), updateQuantityProductsOnCartPage(), updateQuantityProductsOnCartBtn(), updateStyleForProductPageBtn()">
                <svg class="es-btn-delete-icon" width="16" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.908239 1.8135C0.697254 1.60257 0.697254 1.25151 0.908239 1.0332C1.1266 0.822267 1.47038 0.822267 1.68874 1.0332L6.37223 5.72338L11.0636 1.0332C11.2746 0.822267 11.6257 0.822267 11.8362 1.0332C12.0546 1.25151 12.0546 1.60306 11.8362 1.8135L7.15273 6.49631L11.8362 11.1865C12.0546 11.3974 12.0546 11.7485 11.8362 11.9668C11.6252 12.1777 11.2741 12.1777 11.0636 11.9668L6.37223 7.27662L1.68874 11.9668C1.47038 12.1777 1.1266 12.1777 0.908239 11.9668C0.697254 11.7485 0.697254 11.3969 0.908239 11.1865L5.59173 6.49631L0.908239 1.8135Z"/>
                </svg>
            </button>
        </li>
        `
    }

    if (storage) {
        storage = JSON.parse(storage);

        fetch('../database.json').then(data => data.json())
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
                    price = parseInt(price)
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
    if (loc == '/cart.html' || loc == '/account.html') {
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
    if (loc == '/cart.html' || loc == '/account.html') {
        const container = document.querySelector('.es-cart__products');
        let storage = localStorage.getItem('products');
        container.innerHTML = ''
        if (storage) {
            storage = JSON.parse(storage)
            fetch('../database.json').then(data => data.json())
            .then(data => {
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
                            price = parseInt(price)

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
                            <h3 class="es-title--h3 es-cart__product-title"><a href="/product-page.html" target="_blank" onclick="saveСardId(this), saveIdViewedProduct(${id})" onauxclick="saveСardId(this), saveIdViewedProduct(${id})" data-id="${id}">${name}</a></h3>
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
                        <button class="es-btn-delete es-cart__product-btn" onclick="deleteCardFromLocalStorage(this.parentNode.parentNode), addToCart(), updateQuantityProductsOnCartPage(), updateQuantityProductsOnCartBtn()">
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
function updateQuantityProductsOnCartPage() {
    if (loc == '/cart.html' || loc == '/account.html') {
        let storage = localStorage.getItem('products');
        const container = document.querySelector('.es-specifications__key span')
        if (storage) {
            storage = JSON.parse(storage);
            const quantity = storage.length;
            container.textContent = quantity
        }

    }
};
updateQuantityProductsOnCartPage()



// Функция добавляющая предупреждения и уведомления
function addWarning(container, color, warningBlockId, text, postiton) {
    const modal = document.getElementById(`${container}`);
    const html = `
    <div class="es-absence es-absence--${color} es-margin-top" id="${warningBlockId}">
        <h3 class="es-absence__text">${text}</h3>
    </div>
    `
    modal.insertAdjacentHTML(postiton, html);
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
            addWarning('es-form-signUp', 'green', 'es-warning-signUp-success', 'Вы зарегистрировались', 'beforeend');
        } else {
            deleteWarning(['es-warning-signUp-error', 'es-warning-signUp-success']);
            addWarning('es-form-signUp', 'red', 'es-warning-signUp-error', 'Вы уже зарегистрированы', 'beforeend');
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
                    addWarning('es-form-signIn', 'green', 'es-warning-signIn-success', 'Вы вошли в аккаунт', 'beforeend');
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
                addWarning('es-form-signIn', 'red', 'es-warning-signIn-error', 'Вы неправильно ввели Email или пароль', 'beforeend');
                setTimeout(() => {
                    deleteWarning(['es-warning-signIn-error', 'es-warning-signIn-success']);
                }, 2000);
            }
        } else {
            deleteWarning(['es-warning-signIn-error', 'es-warning-signIn-success']);
            addWarning('es-form-signIn', 'red', 'es-warning-signIn-success', 'Вы еще не зарегистрированы', 'beforeend');
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

        deleteWarning(['es-warning-logOut-success']);
        addWarning('es-form-logOut', 'green', 'es-warning-logOut-success', 'Вы вышли из аккаунта', 'beforeend');
        setTimeout(() => {
            deleteWarning(['es-warning-logOut-success']);
            modal.classList.remove('es-show--animation');
            modal.classList.add('es-hide--animation');
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


function FunctionalityOfStars() {
    const starsList = document.querySelectorAll('.es-write-review__star');
    const radioList = document.querySelectorAll('.es-write-review__radio');
    
    // При наведение на звезду, все звезды идущие за этой звездой, приобредают hover эффект
    starsList.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            starsList.forEach(star => {
                star.classList.remove('es-star--hover');
            })
            for (let i = 0; i <= index; i++) {
                starsList[i].classList.add('es-star--hover');
            };
        });
    });
    
    // Если курсор покидает звезду, то все звезды лишаются hover эффекта
    starsList.forEach((star) => {
        star.addEventListener('mouseout', () => {
            starsList.forEach(star => {
                star.classList.remove('es-star--hover');
            });
        });
    });
    
    
    // При клике на звезду, все звезды идущие за этой звездой, приобретают focus эффект
    radioList.forEach((radio, index) => {
        radio.addEventListener('click', () => {
            starsList.forEach(star => {
                star.classList.remove('es-star--focus');
            });
            for (let i = 0; i <= index; i++) {
                starsList[i].classList.add('es-star--focus');
            };
        });
    });
}
FunctionalityOfStars()



/*  При нажатии на карточку товара, Id этой карточки сохраняется в LocalStorage,
что бы при загрузке страницы product-page отобразить
информацию о товаре с таким id  */
function saveСardId(btn) {
    const cardId = btn.dataset.id;
    localStorage.setItem('cardIdForProductPage', JSON.stringify(cardId))
}


/*  При загрузке страницы product-page срабатывает эта функция,
которая берет id из LocalStorage, находит товар с таким id
в базе данных, и добавляет на страницу  */
function addCardInformation() {
    const id = JSON.parse(localStorage.getItem('cardIdForProductPage'));
    fetch('../database.json').then(data => data.json())
    .then((data) => {
        data.cards.forEach(card => {
            if (card.id == id) {
                new ProductPageHtml(card).render();
            }
        });
    });
}



/*  При нажатии на кнопку срабатывает эта функция, которая берет category и сохраняет его в LocalStorage  */
function saveFilterProps(name, brandOrCategory) {
    if (brandOrCategory === 'Бренды') {
        localStorage.setItem('filterProps', JSON.stringify({category: 'Все категории', brand: name}));
    }
    else if (brandOrCategory === 'Категории') {
        localStorage.setItem('filterProps', JSON.stringify({category: name, brand: 'Все бренды'}));
    }
}



/*  Эта функция срабатывает при загрузке станицы catalog.
Она берет из LocalStorage сохраненную категорию,
и фильтрует товар в соответствии с этой категорией  */
function runFilterWithSavedParameters() {
    let filterProps = localStorage.getItem('filterProps');
    if (filterProps) {
        filterProps = JSON.parse(filterProps);

        const categoriesParent = document.getElementById('es-drop-down-category');
        const brandButtons = document.querySelectorAll('#es-drop-down-brand .es-input__radio');
        const categoryButtons = document.querySelectorAll('#es-drop-down-category .es-input__radio');

        brandButtons.forEach(btn => {
            const name = btn.parentNode.querySelector('p').textContent;
            if (name !== filterProps.brand) btn.checked = false;
            else {
                btn.checked = true;
            }
        });
        categoryButtons.forEach(btn => {
            const name = btn.parentNode.querySelector('p').textContent;
            if (name !== filterProps.category) btn.checked = false;
            else {
                btn.checked = true;
            }
        });
        category = filterProps.category;
        brand = filterProps.brand;
        filter();
    } else {
        category = 'Все категории';
        brand = 'Все бренды';
        filter();
    }
    localStorage.setItem('filterProps', JSON.stringify({category: 'Все категории', brand: 'Все бренды'}));
}



function addProductsWithADiscount(containerName, percent) {
    if (loc == '/index.html') {
        const container = document.querySelector(`.${containerName}`);
        function smallCardHtml(id, name, image, price, discountHtml) {
            return `
            <li class="es-small-card">
                <a href="/product-page.html" target="_blank" onclick="saveСardId(this), saveIdViewedProduct(${id})" onauxclick="saveСardId(this), saveIdViewedProduct(${id})" data-id="${id}">
                    <div class="es-small-card__image-container">
                        <img class="es-small-card__image" src="${image}" alt="${name}">
                    </div>
                    <h3 class="es-title--h3 es-small-card__title">${name}</h3>
    
                    <div class="es-card-prices es-small-card__prices">
                        <span class="es-card-prices__price">${price} ₽</span>
                        ${discountHtml}
                    </div>
                </a>
            </li>
            `
        }
        fetch('../database.json').then(data => data.json())
        .then((data) => {
            data.cards.forEach((card, index) => {
                if (card.discountPercent === percent) {
                    let discountHtml = ''
                    let price = card.price;
                    if (card.discount !== false) {
                        discountHtml = `
                        <span class="es-card-prices__old-price"><span class="es-card-prices__old-price-line"></span>${card.price} ₽</span>
                        <span class="es-card-prices__discount">-${card.discountPercent}%</span>
                        `
                        price = card.price * card.discount;
                        price = parseInt(price)
                    }
                    container.innerHTML += smallCardHtml(card.id, card.name, card.images[0], price, discountHtml)
                }
            });
        })
        .then(() => {
            const container = document.querySelector(`.${containerName}`);
            container.children.forEach((card, index)=> {
                if (index >= 6) {
                    card.remove();
                }
            });
        });
    }
}
addProductsWithADiscount('es-discount__small-cards-list-1', 80);
addProductsWithADiscount('es-discount__small-cards-list-2', 40);


function reviewFunctional() {
    const form = document.querySelector('#es-write-review-form');
    const textarea = form.querySelector('textarea');
    const productName = form.dataset.name;
    const productId = form.dataset.id;
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let storageUser = localStorage.getItem('user');
        if (storageUser) {
            storageUser = JSON.parse(storageUser);

            if (storageUser.loggedIn === true) {
                const formData = new FormData(form);
                let object = Object.fromEntries(formData.entries());
                object.productId = productId;
                object.productName = productName;
                object.date = `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`;
    
                let storageReviews = localStorage.getItem('reviews');
                if (!storageReviews) {
                    let array = [];
                    array.push(object);
                    localStorage.setItem('reviews', JSON.stringify(array));
                }
                else {
                    storageReviews = JSON.parse(storageReviews);
                    storageReviews.push(object);
                    localStorage.setItem('reviews', JSON.stringify(storageReviews));
                }
                textarea.value = '';
                addWarning('es-write-review-form', 'green', 'es-warning-reviews', 'Отзыв успешно оставлен', 'afterbegin');
                setTimeout(() => deleteWarning(['es-warning-reviews']), 3000);
                addReviewFromLocalStorage(productId);
            } else {
                addWarning('es-write-review-form', 'red', 'es-warning-reviews', 'Вы не зарегистрированы или не вошли в аккаунт', 'afterbegin');
                setTimeout(() => deleteWarning(['es-warning-reviews']), 3000);
                textarea.value = '';
            }
        } else {
            addWarning('es-write-review-form', 'red', 'es-warning-reviews', 'Вы не зарегистрированы или не вошли в аккаунт', 'afterbegin');
            setTimeout(() => deleteWarning(['es-warning-reviews']), 3000);
            textarea.value = '';
        }
    });
}



function addReviewFromLocalStorage(id) {
    let storage = localStorage.getItem('reviews');
    const cont = document.querySelector('.es-grid-container--reviews');
    cont.innerHTML = '';
    
    fetch('../database.json').then(data => data.json())
    .then((data) => {
        data.reviews.forEach(item => {
            if (id) {
                if (item.productId == id) new Review('es-grid-container--reviews', item.userName, item.productId, item.stars, item.date, item.text, item.productName).render();
            }
            else new Review('es-grid-container--reviews', item.userName, item.productId, item.stars, item.date, item.text, item.productName).render();
        });
        
    }).then(() => {
        if (storage) {
            storage = JSON.parse(storage);
            storage.forEach(item => {
                if (id) {
                    if (item.productId == id) new Review('es-grid-container--reviews', 'Имя пользователя', item.productId, item.stars, item.date, item.review, item.productName).render();
                }
                else new Review('es-grid-container--reviews', 'Имя пользователя', item.productId, item.stars, item.date, item.review, item.productName).render();
            });
        }
    });
}



// Показать или  скрыть блок
function showBlock(containerName, arrowName) {
    const container = document.getElementById(`${containerName}`);
    container.classList.toggle('es-hide');
    if (arrowName) {
        const arrow = document.getElementById(`${arrowName}`);
        arrow.classList.toggle('es-rotate180');
    }
}



// Если у btnName стоит checked, то показывает containerName
function checkedOrNotChecked(btnName, containerName) {
    const btn = document.querySelector(`#${btnName}`);
    const container = document.querySelector(`#${containerName}`);
    if (btn.checked === true) {
        container.classList.remove('es-hide')
    } else {
        container.classList.add('es-hide')
    }
}



// Функция добавляющая избранные тоавры на странцу аккаунта
function addChosenProducts() {
    if (window.location.pathname === '/account.html') {
        const container = document.querySelector('.es-account__cards-container');
        container.innerHTML = '';
        let storage = localStorage.getItem('chosen');
        if (storage) {
            storage = JSON.parse(storage);
            storage.forEach(item => {
                fetch('../database.json').then(data => data.json())
                .then(data => {
                    data.cards.forEach(card => {
                        if (card.id == item.id) {
                            new Card('es-account__cards-container', 'Все категории', 'Все бренды', card.id).render()
                            .then(() => {
                                ifNoProducts();
                            })
                        }
                    });
                })
            });
        }
        ifNoProducts();
    }
}
addChosenProducts();



// Если в контейнере нету элементов то визуально показать что товаров нет:
function ifNoProducts() {
    const cardsAbsentBlock = document.querySelector(`.es-absence__catalog`);
    let count = document.querySelectorAll('.es-card').length
    if (count === 0) {
        cardsAbsentBlock.classList.remove('es-hide');
        cardsAbsentBlock.classList.add('es-show--flex');
    } else {
        cardsAbsentBlock.classList.add('es-hide');
        cardsAbsentBlock.classList.remove('es-show--flex');
    }
};



function saveIdViewedProduct(id) {
    let storage = localStorage.getItem('viewedProducts');
    if (storage) {
        storage = JSON.parse(storage);
        storage.forEach((item, index) => {if (item == id) storage.splice(index, 1)});
        storage.push(id);
        if (storage.length > 4) {
            storage.splice(0, 1);
        }
        localStorage.setItem('viewedProducts', JSON.stringify(storage));
    } else {
        let array = [];
        array.push(id);
        localStorage.setItem('viewedProducts', JSON.stringify(array));
    }
}

function addViewedProducts() {
    const container = document.querySelector('.es-viewed-products__cards-list');
    let storage = localStorage.getItem('viewedProducts');
    if (container) {
        if (storage) {
            storage = JSON.parse(storage);
            if (storage.length > 0) {
                fetch('../database.json').then(data => data.json())
                .then(data => {
                    storage.forEach(item => {
                        data.cards.forEach(card => {
                            if (card.id === item) {
                                new Card('es-viewed-products__cards-list', 'Все категории', 'Все бренды', card.id).render()
                            }
                        });
                    });
                });
            } else addWarning('es-viewed-products__cards-list', 'silver', 'absence-of.products', 'Товары отсутствуют' , 'beforeend');
        }
        else addWarning('es-viewed-products__cards-list', 'silver', 'absence-of.products', 'Товары отсутствуют' , 'beforeend');
    }
}
addViewedProducts();





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


if (window.location.pathname == '/offer.html') {
    window.onbeforeunload = () => {
        const id = parseInt(document.querySelector('.offer-content').dataset.id);
        localStorage.setItem('offerId', JSON.stringify(id));
    }
}

// Функция добавляющая информацию об акции на страницу offer.html
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





function saveSearchValue(btn) {
    let value = btn.parentNode.querySelector('.es-input-search__input').value
    value = value.toLowerCase();


    localStorage.setItem('searchValue', JSON.stringify(value))
}


function eventKeydownOnTheSearchInput() {
    const searchInputs = document.querySelectorAll('.es-input-search__input');
    searchInputs.forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                let value = item.value;
                value = value.toLowerCase();
                localStorage.setItem('searchValue', JSON.stringify(value))
                window.location = '/search-page.html'
              }
        });
    });
}
eventKeydownOnTheSearchInput();


function addCardsToTheSearchPage() {
    const value = JSON.parse(localStorage.getItem('searchValue'));
    document.querySelector('#es-search-page__search-input').value = value

    fetch('/database.json').then(data => data.json())
    .then(data => {
        data.cards.forEach(card => {
            const name = card.name.toLowerCase();
            const category = card.information.category.toLowerCase();
            const brand = card.information.brand.toLowerCase();
            if (value === name || value === category || value === brand) {
                new Card('es-search-page__cards-list', 'Все категории', 'Все бренды', card.id).render();
            }
        });
    })
}






// Все отзывы на странице reviews
if (loc == '/reviews.html') {
    reviewFunctional();
    addReviewFromLocalStorage();
}


// 4 отзыва на главной странице
if (loc == '/index.html') {
    fetch('../database.json').then(data => data.json())
    .then((data) => {
        data.reviews.forEach((item, index)=> {
            if (index < 4) new Review('es-grid-container--reviews', item.userName, item.productId, item.stars, item.date, item.text, item.productName).render();
        });
    })
}


if (loc == "/index.html") {
    new Card('es-leaders__cards-list', 'Лидеры продаж', 'Все бренды', [0,4]).render();
}


// HEADER:
new Header().render();

// FOOTER:
new Footer().render();

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
], true).render();

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
], true, signUp).render()


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
], true, signIn).render();


new Modal('logOut', 'Вы уверены что хотите выйти из аккаунта?', 'Да', [], true, logOut).render();
