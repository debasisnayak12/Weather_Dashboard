const apiKey = 'ed4d31dd300b25a056d846b625caf1b0';
const searchBtn = document.querySelector('.search-btn');
const inputField = document.querySelector('.inputField');
const container = document.querySelector('.container');

let cities = [];

async function addCity(){
    let cityName = inputField.value.trim();
    if(cityName === ''){
        alert('Please Enter a City Name');
    }
    // check if cityName is already exist or not 
    else if(cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())){
        alert("City already exist");
    }
    // fetch data from weather api 
    else{
        fetchWeather(cityName);
        // clear the inputField 
        inputField.value = '';
    }
    
}

async function fetchWeather(cityName){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    try{
        let response = await fetch(apiUrl);
        let data = await response.json();
        // console.log(data);
        if(data.message === 'city not found'){
            alert(`${data.message} Enter valid city.`)
        }
        else{
            cities.push(data)
            renderWeatherCard();
        }
    }catch(error) {
        console.log('Error fetching weather data: ', error);
    }
}

function renderWeatherCard(){
    // container.innerHTML = '';
    const sortedCitiesWithTemp = cities.sort((a, b) => {
        return a.main.temp - b.main.temp;
    })
    console.log("Sorted cities");
    console.log(sortedCitiesWithTemp);

    container.innerHTML = '';
    sortedCitiesWithTemp.forEach((city) => {
        container.append(displayUi(city));
    })

}

function displayUi(city){
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card';

    cardContainer.innerHTML = `<div class="leftSide">
    <div class="par">
        <div class="temp">${city.main.temp}°</div>
      <div class="rightSide">
          <img src="https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png">    
      </div>
      </div>   
      <div class="mur">
      <div class="city">
          <p>H:${city.main.temp_min}°   L:${city.main.temp_max}°</p>
          <p>${city.name}, ${city.sys.country}</p>
        </div>
        <p class="weatherReport">${city.weather[0].description}</p>
        </div>
      </div>`;

      return cardContainer;
}

searchBtn.addEventListener('click', addCity);
