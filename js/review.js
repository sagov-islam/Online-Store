'use strict';

class Review {
    constructor(container, userName, productId, stars, reviewDate, reviewText, productName) {
        this.container = container
        this.userName = userName
        this.productId = productId
        this.productName = productName
        this.stars = stars
        this.reviewDate = reviewDate
        this.reviewText = reviewText
    }

    render() {
        let container = document.querySelector(`.${this.container}`);
        const reviewHtml = (userName, productName, reviewDate, reviewText, stars, id) => {
            return `
            <li class="es-review">
                <div class="es-review__header">
                    <h3 class="es-title--h3 es-review__userName">${userName}</h3>
                    <a class="es-review__product-name" href="/product-page.html" target="_blank" onclick="saveСardId(this)" onauxclick="saveСardId(this)" data-id="${id}"> ${productName}</a>
                </div>
                <p class="es-review__date">${reviewDate}</p>
                <div class="es-review__stars">
                    ${stars}
                </div>
                <p class="es-text es-review__text">${reviewText}</p>
            </li>
            `
        };


        // Звездочки
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < this.stars) {
                stars += `
                <svg class="es-review__star es-review__star--active" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                </svg>
                `
            } else {
                stars += `
                <svg class="es-review__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.34 0L13.886 7.83575L22.125 7.83575L15.4595 12.6785L18.0055 20.5143L11.34 15.6715L4.67452 20.5143L7.2205 12.6785L0.555019 7.83575L8.79401 7.83575L11.34 0Z"/>
                </svg>
                `
            }
        }

        // Имя и Фамилия
        if (this.userName === 'Имя пользователя') {
            let storage = localStorage.getItem('user');
            if (storage) {
                storage = JSON.parse(storage);
                this.userName = `${storage.firstName} ${storage.lastName}`;
            }
        }

        // Название продукта
        if(this.productName) this.productName = `| ${this.productName}`;
        else this.productName = '';
        container.innerHTML += reviewHtml(this.userName, this.productName, this.reviewDate, this.reviewText, stars, this.productId);
    }
}