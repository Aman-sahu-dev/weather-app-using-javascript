const api = {
    key: "36dd267ebc8442164b40cabe86763f6f",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {

    let city = document.querySelector('.location .city');
    let now = new Date();
    let date = document.querySelector('.location .date');
    let temp = document.querySelector('.temp');
    let weather_el = document.querySelector('.weather');
    let hilow = document.querySelector('.hi-low');
    let humidity = document.querySelector('#hval');
    let visibility = document.querySelector('#vval');
    let windspeed = document.querySelector('#speed');
    let icon = document.querySelector('#cloudicon');

    city.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = dateBuilder(now);
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    weather_el.innerText = weather.weather[0].main;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`;
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    humidity.innerText = `${weather.main.humidity}`;
    visibility.innerText = `${weather.visibility}`;
    windspeed.innerText = `${weather.wind.speed}`;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}