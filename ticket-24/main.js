//----------------------------------THE PLAN---------------------------

//1. Create dom for elements needed to test api
//--> id="search-input"
//--> id="search-button"
//--> id="location-placeholder"
//--> id="weather-placeholder"
//2. Fetch data from api
//3. Append data to the dom for default weather city
//4. Append data to the dom for weather associated with user input


//-------------------------------API KEY(S)---------------------------
//API KEY for WeatherAPI.com: b38cc93161464a2ab2e173922221104
let apiKey = 'b38cc93161464a2ab2e173922221104';
// import apiKey from `./apiKeys.js`;

//API Key for OpenWeather: 91071e4140cc9b2dc181a6d120e76cc8
let apiKey2 = `91071e4140cc9b2dc181a6d120e76cc8`;

//--> Weatherbit.io
let apiKey3 = `3f9ee3f848f44739abf4ab9c3f6b5e3e`;

//-->AerisWeather.com 
//client id: 
let aerisClientID = `yjOvEECDU5vQUHKAcsCdh`;
//key: 
let aerisKey = `W7h4ov51ktrAWwswXtVzz0bLZr6YsrHJlzTrZ8hn`;

//-->Trimble Maps Free Trial API Key:  D8D9A146E2C2A24F9C05DF1ED6D40585
let trimbleKey = `D8D9A146E2C2A24F9C05DF1ED6D40585`;
TrimbleMaps.APIKey = trimbleKey;

//------------------------------DOM ELEMENTS---------------------------
// let searchBtn = document.getElementById('search-button');
// searchBtn.addEventListener( `click`, chooseLocation);
let weatherCity = document.querySelector('#city');
let weatherDateTime = document.querySelector('#date-time');
// const currentDateTime = new Date();
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
                    weatherDateTime.innerHTML = `${data.location.localtime}`;
                    weatherTemperature.innerHTML = `${data.current.temp_f}`;

                    let long = data.location.lon;
                    let lat = data.location.lat;

                    //-----------------------------TRIMBLE MAPS 1 - START---------------------------
                    //NOTE: Dimensions of Map Are: (height: 377.99px, width: 444px)

                    var myMap = new TrimbleMaps.Map({
                        container: "myMap",
                        // center: new TrimbleMaps.LngLat(-98.38, 38.69),
                        center: new TrimbleMaps.LngLat(long, lat),
                        style: TrimbleMaps.Common.Style.TRANSPORTATION,
                        zoom: 10,
                    });
                    //----------------weather visibility------------------

                    function switchLayer(layerId) {
                        if (layerId === 'weather_radar') {
                            myMap.setWeatherRadarVisibility(true);
                        } else {
                            myMap.setWeatherRadarVisibility(false);
                        }
                        if (layerId === 'weather_cloud') {
                            map.setWeatherCloudVisibility(true);
                        } else {
                            myMap.setWeatherCloudVisibility(false);
                        }
                    }
        
                    function clickHandler (elem) {
                        switchLayer(elem.target.value);
                    }
        
                    const layerList = document.getElementById('menu');
                    const inputs = layerList.getElementsByTagName('input');
        
                    myMap.on('load', function() {
                        for (const element of inputs) {
                            element.onclick = clickHandler;
                            if(element.checked === true) {
                                switchLayer(element.id);
                            }
                        }
                    });
                    //----------------weather visibility------------------
                    //-----------------------------TRIMBLE MAPS 1 - END---------------------------


                }).catch((error)=> {console.log(`There's a Problem: ${error}`)});

            //--------------------------DAY FORCAST------------------------------------------
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Atlanta`).then(function(response){
                return response.json();
                }).then(function(data){
                    console.log(`Forecast Data is Now Available`);
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





