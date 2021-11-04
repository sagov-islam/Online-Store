'use strict';
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

let i = 0
let cardSliderId = []
function Card(containerName, categoryName, brandName, count) {
    
    function cardSlider() {
        cardSliderId.forEach(item => {
            let numOfPiexels = 0
            const cardSlider = document.querySelector(`.${item}`)
            const rightBtn = cardSlider.querySelector('.es-card__slider-btn-right');
            const leftBtn = cardSlider.querySelector('.es-card__slider-btn-left');
            rightBtn.addEventListener('click', () => {
                const btnContainer = cardSlider.querySelector('.es-card__slider-list');
                numOfPiexels == 66 ? numOfPiexels = 0 : numOfPiexels += 33;
                btnContainer.style.transform = `translate(-${numOfPiexels}%, 0px)`
            });
            leftBtn.addEventListener('click', () => {
                const btnContainer = cardSlider.querySelector('.es-card__slider-list');
                numOfPiexels === 0 ? numOfPiexels = 66 : numOfPiexels -= 33;
                btnContainer.style.transform = `translate(-${numOfPiexels}%, 0px)`
            });
        });
    };


    // -------- Класс для карточки товара -------- \\
    class Card {
        constructor (container, category, brand, numOfCards) {
            this.container = container
            this.category = category
            this.numOfCards = numOfCards
            this.brand = brand
        }

        minusNumber(btn) {
            const count = btn.nextElementSibling
            let countNum = count.innerHTML
            if (countNum <= 1) {
                countNum = 1
            } else {
                count.textContent = --countNum
            }
        }


        plusNumber(btn) {
            const count = btn.previousElementSibling
            let countNum = count.innerHTML
            count.textContent = ++countNum
        }
        

        deleteFromLocalStorage(btn) {
            const parent = btn.parentNode.parentNode.parentNode.parentNode;
            const storage = JSON.parse(localStorage.getItem('products'))
            if (storage) {
                storage.forEach((item, index) => {
                    if (parent.dataset.id === item.id) {
                        storage.splice(index, 1)
                    }
                })
                localStorage.setItem('products', JSON.stringify(storage));
                addStyleCheckedCardBtn()
            }
        }


        addToLocalStorageChosen(btn) {
            const parent = btn.parentNode.parentNode.parentNode.parentNode;
            const parentId = parent.dataset.id
            let storage = localStorage.getItem('chosen')

            if (btn.id === 'checked') {
                storage = JSON.parse(storage)
                storage.forEach((item, index) => {
                    if (item.id === parentId) {
                        storage.splice(index, 1)
                        localStorage.setItem('chosen', JSON.stringify(storage))
                    }
                });
                addStyleCheckedChosenBtn()
            } else {
                if (storage) {
                    storage = JSON.parse(storage)
                    storage.push({id: parentId})
                    localStorage.setItem('chosen', JSON.stringify(storage));
                } else {
                    localStorage.setItem('chosen', JSON.stringify([{id: parentId}]))
                }
                addStyleCheckedChosenBtn()
            }
        }


        addToLocalStorageProducts(btn) {
            if (btn.id === 'checked') {
                // Если товар уже есть в LocalStorage, то он удаляется из него
                this.deleteFromLocalStorage(btn)
            } else {
                // Если его нет, то он добавляется в LocalStorage
                const parent = btn.parentNode.parentNode.parentNode.parentNode;
                const id = parent.dataset.id;
                const count = parent.querySelector('.es-counter__count').innerHTML;
                const priceString = parent.querySelector('.es-card-prices__price').innerHTML;
                const price = parseInt(priceString.replace(/\D/g,''));
    
                const productProps = {id, price, count}
                const storage = localStorage.getItem('products')
    
                if (!storage) {
                    const array = []
                    array.push(productProps)
                    localStorage.setItem('products', JSON.stringify(array))
                } else {
                    const parsedStorage = JSON.parse(storage);
                    parsedStorage.push(productProps)
                    localStorage.setItem('products', JSON.stringify(parsedStorage))
                }
                addStyleCheckedCardBtn()
            }
            
        }


        render() {
            return new Promise((resolve,reject) => {
                i = 0;
                cardSliderId = []
    
                let container = document.querySelector(`.${this.container}`);
                const cardHtml = (title, description, inStock, price, discountHtml, id, images) => {
                    return`
                    <li class="es-card" data-id="${id}">
                        <div class="es-card__slider slider${i}">
                            <div class="es-card__slider-buttons">
                                <button class="es-btn-slider es-card__slider-btn-left" id="btn-left">
                                    <svg class="es-btn-slider__svg-left" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                    </svg>
                                </button>
                                <button class="es-btn-slider es-card__slider-btn-right" id="btn-right">
                                    <svg class="es-btn-slider__svg-right es-rotate" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="es-card__slider-container">
                                <div class="es-card__slider-list">
                                    <div class="es-card__slider-slide">
                                        <img src="${images[0]}" alt="${title}">
                                    </div>
                                    <div class="es-card__slider-slide">
                                        <img src="${images[1]}" alt="${title}">
                                    </div>
                                    <div class="es-card__slider-slide">
                                        <img src="${images[2]}" alt="${title}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="es-card__info">
                            <div>
                                <h3 class="es-title--h3 es-card__title"><a href="#">${title}</a></h3>
                                <p class="es-card__description">${description}</p>
                            </div>

                            <div class="es-margin-top">
                                <div class="es-counter es-card__counter">
                                    <div class="es-counter__content">
                                        <button class="es-counter__arrow es-counter__arrow-1" onclick="card.minusNumber(this)">
                                            <svg class="es-counter__svg es-counter__svg-minus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                            </svg>
                                        </button>
                                        <span class="es-counter__count">1</span>
                                        <button class="es-counter__arrow es-counter__arrow-2" onclick="card.plusNumber(this)">
                                            <svg class="es-counter__svg es-counter__svg-plus" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.3902 0.162908L9.84025 4.70779C9.94325 4.8129 10 4.95323 10 5.10285C10 5.25247 9.94325 5.39279 9.84025 5.49791L9.51261 5.83261C9.29911 6.0504 8.95212 6.0504 8.73895 5.83261L5.00207 2.01616L1.26105 5.83684C1.15804 5.94196 1.02072 6 0.874301 6C0.727717 6 0.590401 5.94196 0.487313 5.83684L0.159754 5.50214C0.056747 5.39694 -2.29018e-07 5.2567 -2.27233e-07 5.10708C-2.25449e-07 4.95746 0.056747 4.81714 0.159754 4.71202L4.61386 0.162908C4.7172 0.0575419 4.85516 -0.000330684 5.00183 1.44263e-06C5.14906 -0.00033068 5.28695 0.0575419 5.3902 0.162908Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="es-card-prices">
                                    <span class="es-card-prices__price">${price} ₽</span>
                                    ${discountHtml}
                                </div>
                                <div class="es-card__buttons">
                                    <button class="es-btn-orange es-btn es-btn--size-all-width" onclick="card.addToLocalStorageProducts(this)">
                                        <span class="es-btn-orange__text">Добавить в корзину</span>
                                        <div class="es-btn-orange__bg-1"></div>
                                        <div class="es-btn-orange__bg-2"></div>
                                    </button>
                                    <button class="es-btn-chosen es-btn-chosen--hover es-margin-left" onclick="card.addToLocalStorageChosen(this)">
                                        <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5612 4.27079L13.6053 4.35296L13.6493 4.27079C13.8371 3.92062 14.0607 3.54864 14.3234 3.17781C15.3365 1.74802 17.1384 0.05 19.9828 0.05C22.0071 0.05 23.8552 0.882527 25.1878 2.39455C26.4594 3.83745 27.1606 5.77099 27.1606 7.83983C27.1606 10.0891 26.2831 12.1839 24.3904 14.435C22.6974 16.4485 20.2608 18.5251 17.434 20.9339L17.4242 20.9422C16.3742 21.8371 15.2882 22.7626 14.1322 23.774L14.1322 23.774L14.0974 23.8045C13.9565 23.9278 13.7809 23.9894 13.6053 23.9894C13.4296 23.9894 13.254 23.9278 13.1131 23.8045L13.0783 23.774L13.0783 23.774C11.9187 22.7594 10.8296 21.8313 9.77663 20.934C6.9497 18.5251 4.51307 16.4485 2.82007 14.435C0.927373 12.184 0.0498779 10.0891 0.0498779 7.83983C0.0498779 5.771 0.75115 3.83745 2.02266 2.3946C3.35527 0.882579 5.20344 0.05 7.22773 0.05C10.0721 0.05 11.874 1.74802 12.8871 3.17781C13.1499 3.54864 13.3734 3.92061 13.5612 4.27079ZM13.5724 22.2221L13.6053 22.2507L13.6381 22.2221C14.6229 21.366 15.5569 20.5701 16.4647 19.7966L16.4674 19.7942C19.2304 17.4398 21.5289 15.4812 23.1362 13.5991C24.7448 11.7155 25.6662 9.90278 25.6662 7.83983C25.6662 6.13724 25.099 4.55394 24.0667 3.38263C23.022 2.19732 21.5713 1.54438 19.9828 1.54438C17.7737 1.54438 16.3475 2.9059 15.5428 4.0417C14.8208 5.06063 14.4443 6.08723 14.3157 6.48176L14.3157 6.48177C14.2155 6.78936 13.9287 6.99753 13.6053 6.99753C13.2818 6.99753 12.995 6.78936 12.8948 6.48177L12.8948 6.48176C12.7663 6.08723 12.3897 5.06063 11.6677 4.04176C10.863 2.9059 9.43683 1.54438 7.22773 1.54438C5.63923 1.54438 4.18852 2.19732 3.14379 3.38263L3.14379 3.38263C2.11154 4.55394 1.54426 6.13724 1.54426 7.83983C1.54426 9.90278 2.46565 11.7155 4.07429 13.5991C5.68155 15.4811 7.98001 17.4397 10.7428 19.794L10.7457 19.7965C11.6536 20.5701 12.5877 21.3661 13.5724 22.2221Z" stroke-width="0.1"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    `
                }
                let cards = []; // Массив в который будут добавляться отфильтрованные карточки товара
                fetch('../database.json')
                .then(data => data.json())
                .then(data => {
                    data.cards.forEach(card => {
                        if (this.category === 'Лидеры продаж') {
                            if (card.information.leader === true) {
                                cards.push(card)
                            }
                        }

                        if (this.category === card.information.category) {
                            cards.push(card)
                        }

                        if (this.category === 'Все категории') {
                            cards.push(card)
                        };

                    })
                })
                .then(() => {
                    // Фильтрация по брендам
                    let i = 0;
                    if (this.brand !== 'Все бренды') {
                        cards.forEach((card, id) => {
                            for (i; i < 1; i++) {
                                cards = []
                            }
                            if (card.information.brand === this.brand) {
                                cards.push(card);
                            }
                        });
                    }
                })
                .then(() => {
                    // Необходимое количество карточек
                    if (this.numOfCards !== 'Все товары') {
                        cards = cards.splice(this.numOfCards[0], this.numOfCards[1])
                    }
                })
                .then(() => {
                    // Добавление отфильтрованных карточек на страницу
                    cards.forEach((card) => {
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
                            card.name,
                            card.description,
                            card.information.inStock,
                            price,
                            discountHtml,
                            card.id,
                            card.images
                        );
    
                        cardSliderId.push(`slider${i}`) ;
                        i++
                        cardSlider();
                    });
                    resolve()
                })
            })
            .then(() => {
                addStyleCheckedCardBtn()
                addStyleCheckedChosenBtn();
            });
        };
    };
    // -------- Класс для карточки товара -------- \\

    return new Card(containerName, categoryName, brandName, count)
}

const card = new Card();