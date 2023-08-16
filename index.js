window.addEventListener("load", (event) => {
    getResults('new york');
  });

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
        }).then(displayResults)
        .catch(error => {
            alert('Please enter city name correctly');
        });
}
const cityInput = document.getElementsByClassName('search-box')[0];
const suggestions = document.getElementById('suggestions');

cityInput.addEventListener('input', () => {
    const searchText = cityInput.value.trim();
    suggestions.innerHTML = '';

    if (searchText) {
        const apiUrl = `https://api.teleport.org/api/cities/?search=${searchText}&limit=5`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data._embedded['city:search-results'].forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.matching_full_name;
                    li.addEventListener('click', () => {
                        cityInput.value = item.matching_full_name;
                        suggestions.innerHTML = '';
                    });
                    suggestions.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error fetching data. Please check the console for more details.');
            });
    }
});

function displayResults(weather) {

    let city = document.querySelector('.location .city');
    let now = new Date();
    let date = document.querySelector('.location .date');
    let temp = document.querySelector('.temp');
    let temp2 = document.querySelector('.temp2');
    let weather_el = document.querySelector('.weather');
    let hilow = document.querySelector('.hi-low');
    let humidity = document.querySelector('#hval');
    let visibility = document.querySelector('#vval');
    let windspeed = document.querySelector('#speed');
    let icon = document.querySelector('#cloudicon');
    let pressure = document.querySelector('#pressure');

    city.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = dateBuilder(now);
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    temp2.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    weather_el.innerText = weather.weather[0].description;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`;
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    humidity.innerText = `${weather.main.humidity}%`;
    visibility.innerText = `${weather.visibility / 1000} km`;
    windspeed.innerText = `${weather.wind.speed}m/s`;
    pressure.innerText = `${weather.main.pressure} hPa`;

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