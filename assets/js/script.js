const apiKey = `1620ca2a4a57355a91aa2d8e36412f85`

var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#search-form");
const searchInput = document.getElementById(`search-input`);
const fiveDayDiv = document.getElementById(`5-day-div`)
const fiveDayCardsArr = document.querySelectorAll(`.five-day-card`)
const cityWeatherName = document.getElementById(`city-weather-name`)
const cityIcon = document.getElementById(`icon`);
const cityTemp = document.getElementById(`temp`);
const cityWind = document.getElementById(`wind`);
const cityHumid = document.getElementById(`humid`)

// Set display of cards to none by default
for (let i = 0; i < fiveDayCardsArr; i++) {
    fiveDayCardsArr[i].style.display = `none`
}

searchForm.addEventListener(`submit`, searchFormSubmit);

function searchFormSubmit(event) {
    event.preventDefault();
    fetchCity(searchInput.value);
    createCityCard(searchInput.value);
}

function fetchCity(city){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        .then(res => {
            return res.json();
        }).then(res => {
            fetch5Day(res[0].lat, res[0].lon);
        }).catch(err => {
            console.error(err);
        })
}

function fetch5Day(cityLat, cityLon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=metric&appid=1620ca2a4a57355a91aa2d8e36412f85`)
        .then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            let currentDate
            for(let i = 0; i < 5; i++) {
                fiveDayCardsArr[i].innerHTML = ``
            }
            let index = -1;
            for (let i = 0; i < res.list.length; i++) {
                let splitDate = res.list[i].dt_txt.split(` `);
                if (!currentDate) {
                    currentDate = splitDate[0];
                    console.log(currentDate);
                    render5DayCard(currentDate, res.list[i].weather[0].icon, res.list[i].main.temp, res.list[i].wind.speed, res.list[i].main.humidity, index, res.city.name)
                    index++
                } else if (currentDate !== splitDate[0]) {
                    currentDate = splitDate[0];
                    console.log(currentDate);
                    render5DayCard(currentDate, res.list[i].weather[0].icon, res.list[i].main.temp, res.list[i].wind.speed, res.list[i].main.humidity, index, res.city.name)
                    index++
                    console.log(i);
                }

            }
        }).catch(err => {
            console.error(err);
        })
}

function render5DayCard(date, icon, temp, wind, humidity, index, cityName) {
    
    if (index >= 0 && index <= 4) {
        // Create elements
        const dateH4 = document.createElement(`h4`);
        const weatherIconImg = document.createElement(`img`)
        const tempP = document.createElement(`p`);
        const windP = document.createElement(`p`);
        const humidityP = document.createElement(`p`);

        // Set text of elements
        dateH4.textContent = date
        weatherIconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        tempP.textContent = `Temp: ${temp}`
        windP.textContent = `Wind: ${wind}km/h`
        humidityP.textContent = `Humidity: ${humidity}%`

        // Append to page
        fiveDayCardsArr[index].appendChild(dateH4);
        fiveDayCardsArr[index].appendChild(weatherIconImg);
        fiveDayCardsArr[index].appendChild(tempP);
        fiveDayCardsArr[index].appendChild(windP);
        fiveDayCardsArr[index].appendChild(humidityP);

        fiveDayCardsArr[index].style.display = `flex`;
    } else if (index === -1) {
        cityWeatherName.textContent = `${cityName} ${date}`
        cityIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        cityTemp.textContent = temp
        cityWind.textContent = wind
        cityHumid.textContent = humidity
    }
}

let count = 0
function createCityCard(city){
    const cityCardDiv = document.getElementById(`city-card-div`)
    const cityCard = document.createElement(`div`);
    cityCard.textContent = city
    cityCard.id = `city-card-id-${count}`
    cityCard.classList.add(`card`, `col`, `mt-2`, `border`, `border-dark`, `rounded-0`, `m-2`, `bg-light`, `rounded-0`, `text-light`, `five-day-card`, `text-dark`)
    cityCardDiv.appendChild(cityCard)
    cityCard.addEventListener(`click`, ()=>fetchCity(city))
}
