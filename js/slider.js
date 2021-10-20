
if (window.location.pathname=='/index.html') {
    const slidesContainer = document.querySelector('.es-slider__list');
    const slides = document.querySelectorAll('.es-slider__item');

    // Динамическое количесвто кнопок переключения слайдов
    const sliderBtnsContainer = document.querySelector('.es-slider__slide-buttons');
    slides.forEach (item => sliderBtnsContainer.innerHTML += '<button class="es-slider__slide-btn"></button>');


    // Переключение слайдов каждый 5 секунд
    const sliderBtns = document.querySelectorAll('.es-slider__slide-btn');
    sliderBtns[0].classList.add('es-slider__slide-btn--focus');

    let i = 100;
    let slidesIndex = 1;
    let timer = setInterval(() => {
        slidesContainer.style.transform = `translate(0px, -${i}%)`;

        // Стиль focus для кнопки переключения слайдов
        sliderBtns.forEach(item => {
            item.classList.remove('es-slider__slide-btn--focus')
        });
        sliderBtns[slidesIndex].classList.add('es-slider__slide-btn--focus');


        i += 100;
        slidesIndex += 1;
        if (slidesIndex >= slides.length) {
            i = 0;
            slidesIndex = 0;
        }
    }, 5000)

    

    // Возможность кликать по кнопкам переключения слайдов
    sliderBtns.forEach((item, index) => {
        item.addEventListener('click', () => {
            let transformNum = 100 * index
            i = transformNum;
            slidesIndex = index;
            slidesContainer.style.transform = `translate(0px, -${transformNum}%)`;

            sliderBtns.forEach(item => {
                item.classList.remove('es-slider__slide-btn--focus')
            });
            item.classList.add('es-slider__slide-btn--focus');
        });
    });


    // Это скрипт оменьшает резмер шрифта заголовка если символов будет слишком много
    const allTitles = document.querySelectorAll('.es-slider__title');
    allTitles.forEach(title => {
        const titleLingth = title.textContent.length;
        if (titleLingth >= 25) {
            title.style.fontSize = '25px';
        }
        
    });
}
