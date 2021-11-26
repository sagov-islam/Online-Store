'use strict'

window.onbeforeunload = () => {
    const product = document.querySelector('.es-product').dataset.id
    localStorage.setItem('cardIdForProductPage', product)
}



function pictureSlider(btn) {
    const secondaryImageBtns = document.querySelectorAll('.es-product__image-btn');
    const mainImage = document.querySelector('.es-product__main-image img');

    const src = btn.querySelector('img').getAttribute('src');
    mainImage.setAttribute('src', src);

    secondaryImageBtns.forEach(item => {
        item.classList.remove('es-product__image-btn--focus')
    });
    btn.classList.add('es-product__image-btn--focus');
    
}


// Функция для табов
function hideOrShowTabsInfo(hide, show) {
    const hideElement = document.querySelector(`.${hide}`);
    const showElement = document.querySelector(`.${show}`);
    hideElement.classList.add('es-hide');
    showElement.classList.remove('es-hide');
}


// Добавляет информация продукта в LocalStorage
function addProductPageInfoToLocalSotrage(btn) {
    let storage = localStorage.getItem('products');

    const parent = document.querySelector('.es-product__information');
    const text = btn.querySelector('.es-btn-orange__text');

    const id = parent.dataset.id;
    let price = parent.querySelector('.es-product__prices-price').textContent;
    price = parseInt(price.replace(/\D/g,''));
    const count = parent.querySelector('.es-counter__count');
    
    if (btn.id === 'checked') {
        count.textContent = '1';
        btn.id = '';
        text.textContent = 'Добавить в корзину';
        btn.classList.remove('es-btn-orange--checked');

        if (storage) {
            storage = JSON.parse(storage);
            storage.forEach((item, index) => {
                if (item.id == id) {
                    storage.splice(index, 1);
                }
            });
            localStorage.setItem('products', JSON.stringify(storage))
        }
        updateStyleForProductPageBtn();
        addToCart();
        updateCartSum('es-amount-sum');
        updateQuantityProductsOnCartBtn();
        addStyleCheckedCardBtn();

    } else {

        btn.id = 'checked'
        text.textContent = 'Удалить из коризины'
        btn.classList.add('es-btn-orange--checked') 
        const productProps = {
            id,
            price,
            count: count.textContent
        }

        if (!storage) {
            const array = []
            array.push(productProps)
            localStorage.setItem('products', JSON.stringify(array))
        } else {
            storage = JSON.parse(storage);
            storage.push(productProps)
            localStorage.setItem('products', JSON.stringify(storage))
        }
        updateStyleForProductPageBtn();
        addToCart();
        updateCartSum('es-amount-sum');
        updateQuantityProductsOnCartBtn();
        addStyleCheckedCardBtn();
    };
}







class ProductPageHtml {
    constructor(card) {
        this.card = card
    }

    render() {
        const container = document.querySelector('#product-container');
        let images = ''
        this.card.images.forEach(imageSrc => {
            images += `
            <button class="es-product__image-btn" onclick="pictureSlider(this)">
                <img class="es-product__secondary-image" src="${imageSrc}" alt="">
            </button>
            `
        });

        let discountHtml = ''
        let price = this.card.price;
        if (this.card.discount !== false) {
            discountHtml = `
            <span class="es-product__prices-old-price"><span class="es-product__prices-old-price-line"></span>${this.card.price} ₽</span>
            <span class="es-product__prices-discount">-${this.card.discountPercent}%</span>
            `
            price = parseInt(this.card.price * this.card.discount)
        }

        const cardInformationHtml = () => {
            return `
                <div class="es-breadcrumbs">
                    <a href="index.html">Главная</a> /
                    <a href="catalog.html">Каталог</a> /
                    <span class="es-breadcrumbs__page-name">${this.card.name}</span>
                </div>

                <section class="es-product" data-id="${this.card.id}">
                    <h1 class="es-product__title es-title--h1">${this.card.name}</h1>
                    <div class="es-product__main-content">
                        <div class="es-product__images">
                            <div class="es-product__secondary-images">
                                ${images}
                            </div>
                            <div class="es-product__main-image">
                                <img src="${this.card.images[0]}" alt="">
                            </div>
                        </div>

                        <div class="es-product__information" data-id="${this.card.id}">
                            <div class="es-product__prices">
                                <span class="es-product__prices-price">${price} ₽</span>
                                ${discountHtml}
                            </div>
                            <div class="es-counter es-margin-top" data-id="${this.card.id}">
                                <div class="es-counter__content">
                                    <button class="es-counter__arrow es-counter__arrow-1" onclick="minusNumber(this), addToCart()">
                                        <svg class="es-counter__svg es-counter__svg-minus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                        </svg>
                                    </button>
                                    <span class="es-counter__count">1</span>
                                    <button class="es-counter__arrow es-counter__arrow-2" onclick="plusNumber(this), addToCart()">
                                        <svg class="es-counter__svg es-counter__svg-plus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button class="es-btn-orange es-btn es-btn--size-all-width es-margin-bottom es-margin-top es-product-btn-add-to-card" onclick="addProductPageInfoToLocalSotrage(this)">
                                <span class="es-btn-orange__text">Добавить в коризну</span>
                                <div class="es-btn-orange__bg-1"></div>
                                <div class="es-btn-orange__bg-2"></div>
                            </button>
                            <a class="es-btn es-btn--link es-btn--size-all-width es-btn--style-inherit-orange" href="/ordering.html">Купить в 1 клик</a>
                            <ul class="es-specifications">
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">В наличии:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">${this.card.information.inStock}</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Артикул:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">${this.card.information.vendorCode}</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Ширина:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">${this.card.information.width} см</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Высота:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">${this.card.information.height} см</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Глубина:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">${this.card.information.depth} см</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Бренд:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">${this.card.information.brand}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="es-product__footer">
                        <div class="es-product__footer-tabs">
                            <label class="es-product__footer-tabs-label">
                                <input class="es-product__footer-tabs-input" type="radio" name="product-tab" id="about-product" onclick="hideOrShowTabsInfo('es-product__footer-reviews', 'es-product__footer-info')" checked>
                                <span class="es-product__footer-tabs-input-style">О товаре</span>
                            </label>
                            <label class="es-product__footer-tabs-label">
                                <input class="es-product__footer-tabs-input" type="radio" name="product-tab" id="reviews" onclick="hideOrShowTabsInfo('es-product__footer-info', 'es-product__footer-reviews')">
                                <span class="es-product__footer-tabs-input-style">Отзывы</span>
                            </label>
                        </div>
                        <div class="es-text es-product__footer-info">${this.card.description}</div>
                        <div class="es-product__footer-reviews es-hide">
                            <div class="es-write-review">
                                <form action="#" data-id="${this.card.id}" data-name="${this.card.name}" id="es-write-review-form">
                                    <div class="es-write-review__stars">
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="stars" value="1">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="stars" value="2">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="stars" value="3">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="stars" value="4">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="stars" value="5">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                    </div>
                                    <textarea class="es-write-review__textarea es-input--hover es-input--focus" name="review" placeholder="Напишити отзыв" required></textarea>
                                    <button class="es-write-review__btn es-btn es-btn--size-normal es-btn--style-inherit-orange" type="submit">Оставить отзыв</button>
                                </form>
                            </div>
                
                            <ul class="es-grid-container--reviews">
                            </ul>
                        </div>
                    </div>
                </section>
            `
        }
        container.insertAdjacentHTML('afterbegin', cardInformationHtml());
        FunctionalityOfStars();
        updateStyleForProductPageBtn();
        reviewFunctional();
        addReviewFromLocalStorage(this.card.id);
    }
}