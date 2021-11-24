'use strict';

class Footer {
    constructor() {

    }

    render() {
        
        const footerHtml = () => {
            return `
            <footer class="es-footer es-margin-top80">
                <div class="es-container">
                    <div class="es-grid-container--footer">
                        <div class="es-footer__navigation">
                            <div class="es-footer__menu">
                                <h3 class="es-title--h3">Каталог</h3>
                                <ul class="es-footer__links-list">
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Кровати', 'Категории')" onauxclick="saveFilterProps('Кровати', 'Категории')">Кровати</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Матрасы', 'Категории')" onauxclick="saveFilterProps('Матрасы', 'Категории')">Матрасы</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Диваны', 'Категории')" onauxclick="saveFilterProps('Диваны', 'Категории')">Диваны</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Шкафы', 'Категории')" onauxclick="saveFilterProps('Шкафы', 'Категории')">Шкафы</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Комоды', 'Категории')" onauxclick="saveFilterProps('Комоды', 'Категории')">Комоды</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Тумбочки', 'Категории')" onauxclick="saveFilterProps('Тумбочки', 'Категории')">Тумбочки</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Зеркала', 'Категории')" onauxclick="saveFilterProps('Зеркала', 'Категории')">Зеркала</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Столы', 'Категории')" onauxclick="saveFilterProps('Столы', 'Категории')">Столы</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Стулья', 'Категории')" onauxclick="saveFilterProps('Стулья', 'Категории')">Стулья</a></li>
                                </ul>
                            </div>
                            <div class="es-footer__menu">
                                <h3 class="es-title--h3">Поставшики</h3>
                                <ul class="es-footer__links-list">
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Aquaton', 'Бренды')" onauxclick="saveFilterProps('Aquaton', 'Бренды')">Aquaton</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('DreamLine', 'Бренды')" onauxclick="saveFilterProps('DreamLine', 'Бренды')">DreamLine</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Dimax', 'Бренды')" onauxclick="saveFilterProps('Dimax', 'Бренды')">Dimax</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Lonax', 'Бренды')" onauxclick="saveFilterProps('Lonax', 'Бренды')">Lonax</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Affalina', 'Бренды')" onauxclick="saveFilterProps('Affalina', 'Бренды')">Affalina</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="/catalog.html" onclick="saveFilterProps('Alleri', 'Бренды')" onauxclick="saveFilterProps('Alleri', 'Бренды')">Alleri</a></li>
                                </ul>
                            </div>
                            <div class="es-footer__menu">
                                <h3 class="es-title--h3">Меню</h3>
                                <ul class="es-footer__links-list">
                                    <li class="es-footer__links-item"><a class="es-link" href="index.html">Главная</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="catalog.html">Каталог</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="about-us.html">О нас</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="shipping-and-payment.html">Доставка и оплата</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="offers.html">Акции</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="reviews.html">Отзывы</a></li>
                                    <li class="es-footer__links-item"><a class="es-link" href="contacts.html">Контакты</a></li>
                                </ul>
                            </div>
                            
                        </div>
                        <form class="es-footer__form" action="#">
                            <p class="es-text es-text--size-14 es-footer__form-text">Подпишитесь на рассылку и получайте информацию о лучших предложениях</p>
                            <input class="es-input-text  es-input--focus es-input--hover" type="text" name="Имя" placeholder="Имя">
                            <input class="es-input-text es-margin-top  es-input--focus es-input--hover" type="email" name="Email" placeholder="Email">
        
                            <label class="es-input es-footer__label">
                                <input class="es-input__checkbox" type="checkbox" name="Согласие на рассылку">
                                <span class="es-input__checkbox-style"></span>
                                <p class="es-input__text">Даю согласие на рассылку</p>
                            </label>
        
                            <button class="es-btn es-btn--size-all-width es-btn--style-inherit-orange es-margin-top" type="submit">Подписаться</button>
                        </form>
                        <div class="es-footer__contacts">
                            <div class="es-contacts-onformation">
                                <p class="es-contacts-onformation__contact">Email:<span>elitemebel@email.ru</span></p>
                                <p class="es-contacts-onformation__contact">Телефон:<span>+7 (891) 877-42-74</span></p>
                                <p class="es-contacts-onformation__contact">Режим работы:<span>с 9 до 18 (без перерыва и выходных)</span></p>
                            </div>
                            <ul class="es-social-networks">
        
                                <li class="es-social-networks__item">
                                    <a class="es-social-networks__link" href="#">
                                        <img class="es-social-networks__image" src="images/social networks/instagram.svg" width="26" height="26" alt="Instagram"></img>
                                    </a>
                                </li>
                                <li class="es-social-networks__item">
                                    <a class="es-social-networks__link" href="#">
                                        <img class="es-social-networks__image" src="images/social networks/vk.svg" width="26" height="26" alt="Instagram"></img>
                                    </a>
                                </li>
                                <li class="es-social-networks__item">
                                    <a class="es-social-networks__link" href="#">
                                        <img class="es-social-networks__image" src="images/social networks/facebook.svg" width="26" height="26" alt="Instagram"></img>
                                    </a>
                                </li>
        
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="es-footer__content-bottom-bg">
                    <div class="es-container es-footer__content-bottom">
                        <p class="es-text es-text--size-14">© 2000-2021 Интернет-магазин EliteMebel.ru — недорогая мебель от производителя в Москве</p>
                        <a class="es-logo" href="index.html">
                            <img class="es-logo-image" src="images/logo.svg" alt="Logo" width="160" height="27.57">
                        </a>
                    </div>
                </div>
            </footer>
            `
        }
        document.body.insertAdjacentHTML("beforeend", footerHtml());
    };
}

