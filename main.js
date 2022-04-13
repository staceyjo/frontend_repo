//----------------------------------THE PLAN---------------------------

//1. Create dom for elements needed to test api
//--> id="search-input"
//--> id="search-button"
//--> id="location-placeholder"
//--> id="weather-placeholder"
//2. Fetch data from api
//3. Append data to the dom for default weather city
//4. Append data to the dom for weather associated with user input


//----------------------------------API KEY---------------------------
//API KEY for Weather: b38cc93161464a2ab2e173922221104
let apiKey = 'b38cc93161464a2ab2e173922221104';

//----------------------------------DOM ELEMENTS---------------------------
let textInput = document.getElementById('search-input'); //<-- text input from user
let inputBtn = document.getElementById('search-button');
// inputBtn.addEventListener( `click`, getWeather);

let weatherLocation = document.getElementById('location-placeholder')//<-- Where the location info will go
// let weatherCity = document.getElementById('city');
let weatherCity = document.querySelector('#city');
let weatherDateTime = document.querySelector('#date-time');
const currentDateTime = new Date();
let weatherTemperature = document.querySelector('#temperature');
// let weatherIcon = document.getElementById('#condition-icon');

let weatherInfo = document.getElementById('weather-placeholder');//<-- where the actual weather information will go

//----------------------------------FUNCTION(S)---------------------------
function defaultWeather(dataPoint){
    //2a.) Fetch the weather data from the api    
    switch(dataPoint){
        case "default":
            //City of Atlanta
            fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Atlanta`).then(function(response){
            return response.json();
                }).then(function(data){
                    console.log('Success - Information Retrieved Successfully');
                    console.log(data);


                    weatherCity.innerHTML = `${data.location.name}`;
                    weatherDateTime.innerHTML = currentDateTime; //<-- Not part of the api
                    weatherTemperature.innerHTML = `${data.current.temp_f}`;
                    
                    //--------------------------FOR TESTING ONLY----------------------------------
                    // console.log(data)
                    // console.log(data.location)//Returns: Atlanta
                    // console.log(data.location.name)//Returns: Atlanta
                    // console.log(data.location.region)//Returns: Georgia
                    // console.log(data.location.country)//Returns: United States of America
                    // console.log(`Latitude: ${data.location.lat}, Longitude: ${data.location.lon}`);//Returns: Latitude & Longitude for Atlanta, GA

                }).catch((error)=> {console.log(`There's a Problem: ${error}`)});//<--Everything between the curly brackets and the end parentheses "}...);" 


        case "dealersChoice":
            //A random city
    }
}

defaultWeather("default");


//----------------------------------OTHER STUFF---------------------------


// fetch('http://api.weatherapi.com/v1/current.json?key=b38cc93161464a2ab2e173922221104&q=Atlanta').then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log('Success - Information Retrieved Successfully');
//     console.log(data.location)//Returns: Atlanta
//     console.log(data.location.name)//Returns: Atlanta
//     console.log(data.location.region)//Returns: Atlanta
//     console.log(data.location.country)//Returns: Atlanta
//     console.log(`Latitude: ${data.location.lat}, Longitude: ${data.location.lon}`);//Returns: Latitude 

// }).catch((error)=> {console.log(`There's a Problem: ${error}`)});//<--Everything between the curly brackets and the end parentheses "}...);" 
// // is where the reject function would go.

//For the City of Atlanta:
//--> http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Atlanta


