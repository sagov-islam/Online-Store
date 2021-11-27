'use strict';

class Header {
    render() {
        const headerHtml = () => {
            return `
            <header class="es-header">
                <div class="es-header__top">
                    <div class="es-container">
                        <div class="es-header__top-content">
                            <a class="es-logo" href="index.html">
                                <img class="es-logo-image" src="images/logo.svg" alt="Logo" width="160" height="27.57">
                            </a>
                            <nav class="es-header__nav">
                                <ul class="es-header__nav-list">
                                    <li class="es-header__nav-item">
                                        <a class="es-link" href="catalog.html">Каталог</a>
                                    </li>
                                    <li class="es-header__nav-item">
                                        <a class="es-link" href="about-us.html">О нас</a>
                                    </li>
                                    <li class="es-header__nav-item">
                                        <a class="es-link" href="shipping-and-payment.html">Доставка и оплата</a>
                                    </li>
                                    <li class="es-header__nav-item">
                                        <a class="es-link" href="offers.html">Акции</a>
                                    </li>
                                    <li class="es-header__nav-item">
                                        <a class="es-link" href="reviews.html">Отзывы</a>
                                    </li>
                                    <li class="es-header__nav-item">
                                        <a class="es-link" href="contacts.html">Контакты</a>
                                    </li>
                                </ul>
                            </nav>
                            <a class="es-header__phone" href="tel:+78918774-74">+7 (891) 877-42-74</a>
                        </div>
                    </div>
                </div>

                <div class="es-header__bottom">
                    <div class="es-container">
                        <div class="es-header__bottom-content">
                            <div class="es-header__catalog">
                                <button class="es-btn-orange es-btn es-btn--size-small es-header__btn-catalog">
                                    <img class="es-btn-orange__image" src="images/catalog-menu.svg" alt="">
                                    <span class="es-btn-orange__text">Каталог</span>
                                    <div class="es-btn-orange__bg-1"></div>
                                    <div class="es-btn-orange__bg-2"></div>
                                </button>
                                <div class="es-header__catalog-bg1 es-opacity-hide es-opacity-hide--hover">
                                    <div class="es-header__catalog-bg2" data-simplebar>
                                        <ul class="es-drop-down">
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Кровати', 'Категории')" onauxclick="saveFilterProps('Кровати', 'Категории')">Кровати</a>
                                            </li>
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Матрасы', 'Категории')" onauxclick="saveFilterProps('Матрасы', 'Категории')">Матрасы</a>
                                            </li>
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Диваны', 'Категории')" onauxclick="saveFilterProps('Диваны', 'Категории')">Диваны</a>
                                            </li>
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Шкафы', 'Категории')" onauxclick="saveFilterProps('Шкафы', 'Категории')">Шкафы</a>
                                            </li>
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Комоды', 'Категории')" onauxclick="saveFilterProps('Комоды', 'Категории')">Комоды</a>
                                            </li>
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Тумбочки', 'Категории')" onauxclick="saveFilterProps('Тумбочки', 'Категории')">Тумбочки</a>
                                            </li>
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Зеркала', 'Категории')" onauxclick="saveFilterProps('Зеркала', 'Категории')">Зеркала</a>
                                            </li>
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Столы', 'Категории')" onauxclick="saveFilterProps('Столы', 'Категории')">Столы</a>
                                            </li>
                                            <li class="es-drop-down__item">
                                                <a class="es-text es-drop-down__link" href="/catalog.html" onclick="saveFilterProps('Стулья', 'Категории')" onauxclick="saveFilterProps('Стулья', 'Категории')">Стулья</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                                
                            <div class="es-input-search">
                                <input class="es-input-search__input" type="search" placeholder="Поиск">
                                <a class="es-input-search__btn" href="/search-page.html" onclick="saveSearchValue(this)" onauxclick="saveSearchValue(this)">
                                    <svg width="20" height="20" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path  class="es-input-search__btn-icon" d="M34.4678 31.8795L25.8397 23.2158C28.0582 20.6697 29.2737 17.4662 29.2737 14.1312C29.2737 6.3394 22.7075 0 14.6368 0C6.56621 0 0 6.3394 0 14.1312C0 21.9231 6.56621 28.2625 14.6368 28.2625C17.6667 28.2625 20.5539 27.3802 23.0225 25.7053L31.7161 34.4348C32.0795 34.7991 32.5682 35 33.092 35C33.5877 35 34.058 34.8175 34.415 34.4857C35.1736 33.781 35.1978 32.6124 34.4678 31.8795ZM14.6368 3.68641C20.6023 3.68641 25.4554 8.37184 25.4554 14.1312C25.4554 19.8906 20.6023 24.5761 14.6368 24.5761C8.67137 24.5761 3.81831 19.8906 3.81831 14.1312C3.81831 8.37184 8.67137 3.68641 14.6368 3.68641Z"/>
                                    </svg>
                                </a>
                            </div>

                            <button class="es-btn-orange es-btn es-btn--size-normal es-margin-left" onclick="showModal('call')">
                                <span class="es-btn-orange__text">Заказать звонок</span>
                                <div class="es-btn-orange__bg-1"></div>
                                <div class="es-btn-orange__bg-2"></div>
                            </button>

                            <div class="es-header__user-buttons">
                                <a class="es-header__chosen-btn" href="/account.html">
                                    <span class="es-header__quantity-products" id="chosen-quantity-products">3</span>
                                    <img src="images/chosen.svg" alt="Chosen">
                                </a>

                                <div class="es-header__account">
                                    <button class="es-header__account-btn" href="#"><img src="images/account.svg" alt="Account"></button>
                                    <div class="es-header__account-bg1 es-opacity-hide es-opacity-hide--hover">
                                        <div class="es-header__account-bg2">
                                            <ul class="es-drop-down" id="es-header-account-drop-down">
                                                <li class="es-drop-down__item">
                                                    <button class="es-text es-drop-down__link es-center" onclick="showModal('signUp')">Зарегистрироваться</button>
                                                </li>
                                                <li class="es-drop-down__item ">
                                                    <button class="es-text es-drop-down__link es-center" onclick="showModal('signIn')">Войти</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> 
                                </div>
                                
                                <div class="es-header__cart">
                                    <button class="es-header__cart-btn">
                                        <img src="images/cart.svg" alt="Cart">
                                    </button>
                                    <div class="es-header__cart-bg-1 es-opacity-hide es-opacity-hide--hover">
                                        <div class="es-header__cart-bg-2" >
                                            <div class="es-header__cart-products" data-simplebar>
                                                <ul class="es-header__cart-products-list">

                                                </ul>
                                            </div>
                                            <div class="es-header__cart-footer">
                                                <p class="es-amount">Итого: <span class="es-amount-sum">0 ₽</span></p>
                                                <a class="es-btn es-btn--size-all-width es-btn--style-inherit-orange es-margin-top  es-btn--link" href="/cart.html" id="cart-btn">Перейти в коризну</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </header>
            `
        };
        document.body.insertAdjacentHTML("afterbegin", headerHtml());
        addToCart();
        updateCartSum('es-amount-sum');
        checkLoggedInOrNot();
        stickyHeader();
        updateQuantityProductsOnCartBtn();
        udateQuantityProductsOnChosenBtn();
        eventKeydownOnTheSearchInput();
    }
}

const header = new Header();