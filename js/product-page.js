'use strict'

const secondaryImageBtns = document.querySelectorAll('.es-product__image-btn');
const secondaryImages = document.querySelectorAll('.es-product__secondary-image');
const mainImage = document.querySelector('.es-product__main-image img');

// При загрузке страницы в главную картинку вставляется src самой первой второстепенной картинки.
// secondaryImageBtns[0].classList.add('es-product__image-btn--focus');
// const firstImageSrc = secondaryImageBtns[0].querySelector('.es-product__secondary-image').getAttribute('src');
// mainImage.setAttribute('src', firstImageSrc)


// Слайдер картинок
secondaryImageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        secondaryImageBtns.forEach(btn => {
            btn.classList.remove('es-product__image-btn--focus');
        });
        btn.classList.add('es-product__image-btn--focus')
        const src = btn.querySelector('.es-product__secondary-image').getAttribute('src');
        mainImage.setAttribute('src', src)
    });
});

// Табы
const
aboutProduct = document.querySelector('.es-product__footer-info'),
reviews = document.querySelector('.es-product__footer-reviews'),
btnReview = document.querySelector('#reviews'),
btnAboutProduct = document.querySelector('#about-product');

// btnAboutProduct.addEventListener('click', () => {
//     reviews.classList.add('es-hide');
//     aboutProduct.classList.remove('es-hide')
// });

// btnReview.addEventListener('click', () => {
//     reviews.classList.remove('es-hide');
//     aboutProduct.classList.add('es-hide')
// });


window.onbeforeunload = () => {
    const product = document.querySelector('.es-product').dataset.id
    localStorage.setItem('cardIdForProductPage', product)
}


class ProductPageHtml {
    constructor(id, name, description, images, price, discount, discountPercent) {
        this.id = id
        this.name = name
        this.description = description
        this.images = images
        this.price = price
        this.discount = discount
        this.discountPercent = discountPercent
    }

    render() {
        const container = document.querySelector('#product-container');

        let images = ''
        this.images.forEach(imageSrc => {
            images += `
            <button class="es-product__image-btn">
                <img class="es-product__secondary-image" src="${imageSrc}" alt="">
            </button>
            `
        });
        const cardInformationHtml = () => {
            return `
                <div class="es-breadcrumbs">
                    <a href="index.html">Главная</a> /
                    <a href="catalog.html">Каталог</a> /
                    <span class="es-breadcrumbs__page-name">${this.name}</span>
                </div>

                <section class="es-product" data-id="${this.id}">
                    <h1 class="es-product__title es-title--h1">${this.name}</h1>
                    <div class="es-product__main-content">
                        <div class="es-product__images">
                            <div class="es-product__secondary-images">
                                ${images}
                            </div>
                            <div class="es-product__main-image">
                                <img src="${this.images[0]}" alt="">
                            </div>
                        </div>

                        <div class="es-product__information">
                            <div class="es-product__prices">
                                <span class="es-product__prices-price">12 000 ₽</span>
                                <span class="es-product__prices-old-price"><span class="es-product__prices-old-price-line"></span>16 000 ₽</span>
                                <span class="es-product__prices-discount">-50%</span>
                            </div>
                            <div class="es-counter es-margin-top">
                                <div class="es-counter__content">
                                    <button class="es-counter__arrow es-counter__arrow-1">
                                        <svg class="es-counter__svg es-counter__svg-minus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                        </svg>
                                    </button>
                                    <span class="es-counter__count"></span>
                                    <button class="es-counter__arrow es-counter__arrow-2">
                                        <svg class="es-counter__svg es-counter__svg-plus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button class="es-btn-orange es-btn es-btn--size-all-width es-margin-bottom es-margin-top">
                                <span class="es-btn-orange__text">Добавить в коризну</span>
                                <div class="es-btn-orange__bg-1"></div>
                                <div class="es-btn-orange__bg-2"></div>
                            </button>
                            <button class="es-btn es-btn--size-all-width es-btn--style-inherit-orange">Купить в 1 клик</button>
                            <ul class="es-specifications">
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">В наличии:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">13</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Артикул:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">875456</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Ширина:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">67 см</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Высота:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">70 см</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Глубина:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">70 см</span>
                                </li>
                                <li class="es-specifications__item">
                                    <span class="es-specifications__key">Бренд:</span>
                                    <hr class="es-specifications__line">
                                    <span class="es-specifications__value">Aquaton</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="es-product__footer">
                        <div class="es-product__footer-tabs">
                            <label class="es-product__footer-tabs-label">
                                <input class="es-product__footer-tabs-input" type="radio" name="product-tab" id="about-product" checked>
                                <span class="es-product__footer-tabs-input-style">О товаре</span>
                            </label>
                            <label class="es-product__footer-tabs-label">
                                <input class="es-product__footer-tabs-input" type="radio" name="product-tab" id="reviews">
                                <span class="es-product__footer-tabs-input-style">Отзывы</span>
                            </label>
                        </div>
                        <div class="es-text es-product__footer-info">${this.description}</div>
                        <div class="es-product__footer-reviews es-hide">
                            <div class="es-write-review">
                                <form action="#">
                                    <div class="es-write-review__stars">
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="star" value="1">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="star" value="2">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="star" value="3">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="star" value="4">
                                            <svg class="es-star es-write-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                            </svg>
                                        </label>
                                        <label class="es-write-review__star-container">
                                            <input type="radio" class="es-write-review__radio" name="star" value="5">
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
                                <li class="es-review">
                                    <div class="es-review__header">
                                        <h3 class="es-title--h3">Николай Березов</h3>
                                        <span class="es-review__line"></span>
                                        <p class="es-review__product-name">Кресло Hygge, темно-бирюзовый/орех</p>
                                    </div>
                                    <p class="es-review__date">2021.02.13</p>
                                    <div class="es-review__stars">
                                        <svg class="es-review__star es-review__star--active" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                        </svg>
                                        <svg class="es-review__star es-review__star--active" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                        </svg>
                                        <svg class="es-review__star es-review__star--active" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                        </svg>
                                        <svg class="es-review__star es-review__star--active" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                        </svg>
                                        <svg class="es-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                                        </svg>
                                    </div>
                                    <p class="es-text es-review__text">Все понравилось, от оформления заказа до его получения. Все чётко, быстро. Курьеры вежливые, доставили в интервал, позвонили за 30 мин. Очень доволен!</p>
                                </li>

                            </ul>
                        </div>
                    </div>
                </section>
            `
        }
        container.insertAdjacentHTML('afterbegin', cardInformationHtml());
    }
}