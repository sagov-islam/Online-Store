'use strict';

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
