const apiKey = `1620ca2a4a57355a91aa2d8e36412f85`

var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#search-form");
const searchInput = document.getElementById(`search-input`);

searchForm.addEventListener(`submit`, searchFormSubmit);

function searchFormSubmit(event) {
    event.preventDefault();
    console.log(searchInput.value);
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=1&appid=${apiKey}`)
        .then(res=>{
            return res.json();
        }).then(res=>{
            fetch5Day(res[0].lat, res[0].lon);
            console.log(res[0].lat, res[0].lon);
        }).catch(err=>{
            console.error(err);
        })
}

function fetch5Day(cityLat, cityLon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=metric&appid=1620ca2a4a57355a91aa2d8e36412f85`)
        .then(res=>{
            return res.json();
        }).then(res=>{
            console.log(res);
            let currentDate
            for(let i = 0; i < res.list.length; i++){
                let splitDate = res.list[i].dt_txt.split(` `);
                if(!currentDate) {
                    currentDate = splitDate[0];
                    console.log(currentDate);
                }else if(currentDate !== splitDate[0]){
                    currentDate = splitDate[0];
                    console.log(currentDate);
                }
                
            }
        }).catch(err=>{
            console.error(err);
        })
}

function renderCard(date, temp, wind, humidity) {
    
}
