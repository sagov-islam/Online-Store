
if (window.location.pathname == '/index.html') {
    const daysValue = document.querySelector('.es-timer__days');
    const hoursValue = document.querySelector('.es-timer__hours');
    const minutesValue = document.querySelector('.es-timer__minutes');
    const secondsValue = document.querySelector('.es-timer__seconds');

    const dataEnd = new Date('Dec 15 2021 00:00:00');
    

    const now = new Date();
    const leftUntil = dataEnd - now;

    let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
    let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
    let seconds = Math.floor(leftUntil / 1000) % 60;
    
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
    
    setInterval(() => {
        const now = new Date();
        const leftUntil = dataEnd - now;

        let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
        let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
        let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
        let seconds = Math.floor(leftUntil / 1000) % 60;
        
        daysValue.textContent = days;
        hoursValue.textContent = hours;
        minutesValue.textContent = minutes;
        secondsValue.textContent = seconds;
    }, 1000);
}
