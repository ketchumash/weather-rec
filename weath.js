const api = {
    key: "c3b0f8f84cb4b0aa0a551c4e8da46184",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.inputvalue');
searchbox.addEventListener('keypress', setQuery); /*enter key, 13 is the enter key on keyboard*/



function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.descrip .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

    let weather_el = document.querySelector('.descrip .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hilow');
    hilow.innerText = `H: ${Math.round(weather.main.temp_max)}°f / L: ${Math.round(weather.main.temp_min)}°f `;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
}