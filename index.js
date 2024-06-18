
const weatherForm= document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = 

//
weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city= cityInput.value;
    if(city){
      try{
          const weatherData= await getWeatherData(city);
          displayWeatherInfo(weatherData);
      }
      catch(error){
          console.error(error);
          displayError(error);
      }
    }
    else{
      displayError("Please enter a city")  
    }

})

//the functions bellow are the same as the
//information I previously hard coded to the page/card.
async function getWeatherData(city){
  const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  
  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          reject(new Error(`Could not fetch weather data for ${city}`));
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });

}

function displayWeatherInfo(data){
  //object destructuring
  //I am extracting 
 const {name: city, 
  main: {temp, humidity}, 
  weather: [{description,id}]}=data

  card.textContent="";
  card.style.display="flex"

  const cityDisplay = document.createElement("h1")
  const tempDisplay = document.createElement("p")
  const humidityDisplay = document.createElement("p")
  const descDisplay = document.createElement("p")
  const weatherEmoji = document.createElement("p")

  cityDisplay.textContent= city;
  tempDisplay.textContent=`${((temp-273.15)* 9/5 +32).toFixed(1)}F`
  humidityDisplay.textContent= `Humidity: ${humidity}%`
  descDisplay.textContent=description
  weatherEmoji.textContent=getWeatherEmoji(id)
  humidityDisplay.classList.add("humidityDisplay")
  cityDisplay.classList.add("cityDisplay")
  tempDisplay.classList.add("tempDisplay")
  weatherEmoji.classList.add("weatherEmoji")

  card.appendChild(cityDisplay)
  card.appendChild(tempDisplay)
  card.appendChild(humidityDisplay)
  card.appendChild(descDisplay)
  card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId){
  switch(true){
    case(weatherId >= 200 && weatherId<300):
    return "🌧️"
    case(weatherId >= 300 && weatherId<400):
    return "🌦️"
    case(weatherId >= 500 && weatherId<600):
    return "🌦️"
    case(weatherId >= 600 && weatherId<700):
    return "❄️"
    case(weatherId >= 700 && weatherId<800):
    return "🌫️"
    case(weatherId === 800):
    return "☀️"
    case(weatherId >= 801 && weatherId<810):
    return "☁️"
    default: 
    return "❓"
  }
}

//creates error displayDisplay variable and assigns it a <p> element 
//set the textContent of the <p> as the message argument passed into the function
//add a class to the errorDisplay element
//card is where the weather info will display
function displayError(message){
    const errorDisplay= document.createElement("p");
    errorDisplay.textContent=message
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}