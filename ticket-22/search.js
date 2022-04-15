//-------------------------------API KEY---------------------------
//API KEY for Weather: b38cc93161464a2ab2e173922221104
let apiKey = 'b38cc93161464a2ab2e173922221104';

//------------------------------DOM ELEMENTS---------------------------
// let searchBtn = document.getElementById('search-button');
// searchBtn.addEventListener( `click`, chooseLocation);
let weatherCity = document.querySelector('#city');
let weatherDateTime = document.querySelector('#date-time');
const currentDateTime = new Date();
let weatherTemperature = document.querySelector('#temperature');
// let weatherIcon = document.getElementById('#condition-icon');

//-------------------------------FUNCTION(S)---------------------------
function defaultWeather(dataPoint){
    switch(dataPoint){
        case "default":
            //City of Atlanta
            //--------------------------CITY, STATE / REGION, TEMP.IN F----------------------------------
            fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Atlanta`).then(function(response){
            return response.json();
                }).then(function(data){
                    console.log('Success - This is For The Default City');

                    weatherCity.innerHTML = `${data.location.name}`;
                    weatherDateTime.innerHTML = currentDateTime; //<-- Not part of the api
                    weatherTemperature.innerHTML = `${data.current.temp_f}`;


                }).catch((error)=> {console.log(`There's a Problem: ${error}`)});

            //--------------------------DAY FORCAST------------------------------------------
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Atlanta`).then(function(response){
                return response.json();
            }).then(function(data){
                console.log(`Successful. Forecast Data is Now Available`);
                console.log(data);

            }).catch((error)=> {console.log(`Forecast Not Available. Here's Why: ${error}`)});



        case "dealersChoice":
            //A random city
    }
}

defaultWeather("default"); //<-- Default city when the app is locaded (Atlanta, GA).
//------------------------------------------------------------------------------------------------------------------
function chooseLocation(){
    let textInput = document.querySelector('#search-input'); //<-- dom for input from user
    let choice = textInput.value; //<-- extracted value for user input

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${choice}`).then(function(response){
        return response.json();
            }).then(function(data){
                console.log('Success - This Is For The User Input');
                console.log(data);
                //------------------------------------------------------------
                weatherCity.innerHTML = `${data.location.name}`;
                weatherDateTime.innerHTML = currentDateTime; //<-- Not part of the api
                weatherTemperature.innerHTML = `${data.current.temp_f}`;
            }).catch((error)=> {console.log(`There's a Problem: ${error}`)});
}

chooseLocation(); //<-User Input
//------------------------------------------------------------------------------------------------------------------

