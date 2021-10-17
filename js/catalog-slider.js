export function catalogSlider() {
    if (window.location.pathname=='/index.html') {
        const btnRight = document.querySelector('#btn-right');
        const btnLeft = document.querySelector('#btn-left');
        const container = document.querySelector('.es-catalog-slider__list');

        btnRight.addEventListener('click', () => {
            let catalogItems = document.querySelectorAll('.es-catalog-slider__item');
            let firstChild = catalogItems[0];
            catalogItems[0].remove();
            container.append(firstChild);
        });
        btnLeft.addEventListener('click', () => {
            let catalogItems = document.querySelectorAll('.es-catalog-slider__item');
            let lastChild = catalogItems[catalogItems.length - 1];
            let containerFirstChild = container.firstChild;
            container.insertBefore(lastChild, containerFirstChild);
        }); 
    }
}