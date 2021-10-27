'use strict';

const counters = document.querySelectorAll('.es-counter');

counters.forEach(counter => {
    let i = 0
    const minus = counter.querySelector('.es-counter__arrow-1');
    const plus = counter.querySelector('.es-counter__arrow-2');
    const count = counter.querySelector('.es-counter__count');
    count.textContent = i
    plus.addEventListener('click', () => {
        count.textContent = ++i
    });
    minus.addEventListener('click', () => {
        if (i <= 0) {
            i = 0
        } else {
            count.textContent = --i
        }
    });
});