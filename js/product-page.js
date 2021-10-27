'use strict'

const secondaryImageBtns = document.querySelectorAll('.es-product__image-btn');
const secondaryImages = document.querySelectorAll('.es-product__secondary-image');
const mainImage = document.querySelector('.es-product__main-image img');

// При загрузке страницы в главную картинку вставляется src самой первой второстепенной картинки.
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

// При загрузке страницы в хлебных крошках отображается текст главного заголовка
const breadcrumb = document.querySelector('.es-breadcrumbs__page-name');
const title = document.querySelector('.es-product__title');
breadcrumb.textContent = title.textContent;



// Табы
const
aboutProduct = document.querySelector('.es-product__footer-info'),
reviews = document.querySelector('.es-product__footer-reviews'),
btnReview = document.querySelector('#reviews'),
btnAboutProduct = document.querySelector('#about-product');

btnAboutProduct.addEventListener('click', () => {
    reviews.classList.add('es-hide');
    aboutProduct.classList.remove('es-hide')
});

btnReview.addEventListener('click', () => {
    reviews.classList.remove('es-hide');
    aboutProduct.classList.add('es-hide')
});
