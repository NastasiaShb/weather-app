

const apiKey ='8b43178c6d5749ceb2e183223231805';



const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');


function removeCard(){
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();

}

function showError (errorMessage){
     const html = `<div class="card flex">${data.error.message}</div>`;

     header.insertAdjacentHTML('afterend', html)

}

function showCard ({name, temp, condition}) {
    //разметка для карточки
    const html = ` <div class="card flex">
                        <h2 class="card-city">${name}</h2>
                        <img class="img-wather" src="img/sun.png" alt="weather">
                        <h2 class="degree">${temp}</h2>
                        <h2 class="weather">${condition}</h2>
                    </div>`;

    // отображаем карточку на странице
    header.insertAdjacentHTML('afterend', html)

}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); 
    return data;
}


form.onsubmit = async function (e) {
    e.preventDefault();

    let city = input.value.trim();

    const data = await getWeather (city);

    if (data.error) {
        removeCard();
        showError(data.error.message);
    } else {
        removeCard();

        

        const weatherData = {
            name: data.location.name,
            temp: data.current.temp_c,
            condition: data.current.condition.text,
        
        };

        showCard(weatherData);
    }
   
}