'use strict';

function minusNumber(btn) {
    const count = btn.nextElementSibling
    let countNum = count.innerHTML
    if (countNum <= 1) {
        countNum = 1
    } else {
        count.textContent = --countNum
    }
}


function plusNumber(btn) {
    const count = btn.previousElementSibling
    let countNum = count.innerHTML
    count.textContent = ++countNum
}