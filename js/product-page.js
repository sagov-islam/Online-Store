'use strict'

const secondaryImageBtns = document.querySelectorAll('.es-product__image-btn');
const secondaryImages = document.querySelectorAll('.es-product__secondary-image');
const mainImage = document.querySelector('.es-product__main-image img');

// При загрузке страница в клавную картинку вставляется src самой первой второстепенной картинки.
secondaryImageBtns[0].classList.add('es-product__image-btn--focus');
const firstImageSrc = secondaryImageBtns[0].querySelector('.es-product__secondary-image').getAttribute('src');
mainImage.setAttribute('src', firstImageSrc)


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