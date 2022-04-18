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
let weatherStateRegion = document.querySelector('#state-region');
let weatherDateTime = document.querySelector('#date-time');
// const currentDateTime = new Date();
let weatherTemperature = document.querySelector('#temperature');
let weatherIconBlock = document.getElementById('weather-icon-block');
let weatherIcon = document.getElementById('condition-icon');

let forecastHigh = document.querySelector('#forecast-high');
let forecastLow = document.querySelector('#forecast-low');
let forecastAvg = document.querySelector('#forecast-avg');
let chanceOfRain = document.querySelector('#chance-of-rain');
let rainInches = document.querySelector('#total-precip-in');
let maxWindSpeed = document.querySelector('#max-wind');

//-------------------------------FUNCTION(S)---------------------------

//:::::::::::::::::::::::::::::::::::::::Shows The Default City::::::::::::::::::::::::::::::::::::::::::::::::::::

function defaultWeather(){
//--------------------------START OF FETCH-------------------------------------------
fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Atlanta`).then(function(response){
    return response.json();
        }).then(function(data){
            console.log('Success - This is For The Default City');

            // let iconFromAPI = '//cdn.weatherapi.com/weather/64x64/day/116.png'
            //data.current.condition.text
            console.log(data); //<-- For reference only
            console.log(data.current.condition.icon); //<-- For testing only
            console.log(data.current.condition.text); //<-- For testing only
            console.log(data.current.condition.code); //<-- For testing only

            weatherCity.innerHTML = `${data.location.name} | ${data.current.condition.text}`;
            weatherStateRegion.innerHTML = `${data.location.region}`;
            weatherDateTime.innerHTML = `${data.location.localtime}`;
            weatherTemperature.innerHTML = `${data.current.temp_f}°F`;


            //---------START----------Comparing Icons on Local Machine with Icons Supplied by Api------
            //1. Declare a variable assigned to the icon url provided by the api
            let iconFromAPI = data.current.condition.icon;
            //2. Declare two variables assigned to the unique day and nigttime substrings of the api urls
            let dayIconSubstringFromApi = iconFromAPI.substring(35,46);
            let nightIconSubstringFromApi = iconFromAPI.substring(35,48);
            //3.Assign local machine urls that have been modified with interpolated substrings to their own variables
            let daySource = `/Users/corcoding/Desktop/projects/frontend_repo/ticket-24/weather-icons/weather/64x64/${dayIconSubstringFromApi}`;
            let nightSource = `/Users/corcoding/Desktop/projects/frontend_repo/ticket-24/weather-icons/weather/64x64/${nightIconSubstringFromApi}`;
            //4. Use the length of the url for the api icons to determine if its day or night
            if (iconFromAPI.length === 48){
                //Nighttime icons | length of api url is 48
                weatherIcon.src = nightSource;
            }else{
                //Day time icons | length of api url is 46
                weatherIcon.src = daySource;
            }
            //---------END----------Comparing Icons on Local Machine with Icons Supplied by Api-------

            //--------------------Backgroud Corresponding to Weather Condition----------------------
            // let conditionCode = data.current.condition.code;
            // let rainCodes = [1030, 1150, 1153, 1168, 1180, 1183, 1186, 1189, 1192, 1195,];
            // let severeStormCodes = [1276,1273];
            // let rainVideo = `/Users/corcoding/Desktop/projects/frontend_repo/ticket-34/Rain.mp4`;
            // let snowVideo = `/Users/corcoding/Desktop/projects/frontend_repo/ticket-34/Snow.mp4`;
            // let videoBackground = document.querySelector('#myVideo');
            // var source = document.createElement('source');
            // source.setAttribute('src', 'http://techslides.com/demos/sample-videos/small.mp4');
            // source.setAttribute('type', 'video/mp4');
            // videoBackground.appendChild(source);
            //--------------------Backgroud Corresponding to Weather Condition----------------------

            let long = data.location.lon; //<-- Longitude of a Given Location
            let lat = data.location.lat; //<-- Latitude of a Given Location

            //-----------------------------TRIMBLE MAPS 1 - START---------------------------
            //NOTE: Dimensions of Map Are: (height: 377.99px;, width: 444px;)<-- DESKTOP

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
                    myMap.setWeatherCloudVisibility(true);
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
            console.log(data.forecast.forecastday[0].day.maxtemp_f);
            //NOTE: To Extract forecast data use: data.forecast.forecastday[0].day

            let inches = (data.forecast.forecastday[0].day.totalprecip_in)*100;

            forecastHigh.innerHTML = `High for the Day | ${data.forecast.forecastday[0].day.maxtemp_f}°F`;
            forecastLow.innerHTML = `Low for the Day | ${data.forecast.forecastday[0].day.mintemp_f}°F`;
            forecastAvg.innerHTML = `Today's Average | ${data.forecast.forecastday[0].day.avgtemp_f}°F`;
            chanceOfRain.innerHTML = `Chance of Rain | ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
            rainInches.innerHTML = `Inches of Rain | ${inches} inches`;
            maxWindSpeed.innerHTML = `Windspeed | ${data.forecast.forecastday[0].day.maxwind_mph} mph`;


            // forecastHigh.innerHTML = `${data.forecast.forecastday[0].day}`;

    }).catch((error)=> {console.log(`Forecast Not Available. Here's Why: ${error}`)});
    //-------------------------------------END OF FETCH-------------------------------------
}

//:::::::::::::::::::::::::::::::::Shows what the user searched for::::::::::::::::::::::::::::::::::::::::::::::::::::::

function chooseLocation() {

    let textInput = document.querySelector('#search-input'); //<-- dom for input from user
    let choice = textInput.value; //<-- extracted value for user input

    //--------------------------START OF FETCH-------------------------------------------
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${choice}`).then(function(response){
        return response.json();
            }).then(function(data){
                console.log('Success - This is For The Default City');
    
                weatherCity.innerHTML = `${data.location.name} | ${data.current.condition.text}`;
                weatherStateRegion.innerHTML = `${data.location.region}`;
                weatherDateTime.innerHTML = `${data.location.localtime}`;
                weatherTemperature.innerHTML = `${data.current.temp_f}°F`;


                //---------START----------Comparing Icons on Local Machine with Icons Supplied by Api------
                //1. Declare a variable assigned to the icon url provided by the api
                let iconFromAPI2 = data.current.condition.icon;
                //2. Declare two variables assigned to the unique day and nigttime substrings of the api urls
                let dayIconSubstringFromApi = iconFromAPI2.substring(35,46);
                let nightIconSubstringFromApi = iconFromAPI2.substring(35,48);

                //3. Assign local machine urls that have been modified with interpolated substrings to their own variables
                let daySource = `/Users/corcoding/Desktop/projects/frontend_repo/ticket-24/weather-icons/weather/64x64/${dayIconSubstringFromApi}`;
                let nightSource = `/Users/corcoding/Desktop/projects/frontend_repo/ticket-24/weather-icons/weather/64x64/${nightIconSubstringFromApi}`;

                //4. Use the length of the url for the api icons to determine if its day or night
                if (iconFromAPI2.length === 48){
                    //Nighttime icons | length of api url is 48
                    weatherIcon.src = nightSource;
                }else{
                    //Day time icons | length of api url is 46
                    weatherIcon.src = daySource;
                    
                }
                //---------END----------Comparing Icons on Local Machine with Icons Supplied by Api-------
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
                        myMap.setWeatherCloudVisibility(true);
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
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${choice}`).then(function(response){
            return response.json();
            }).then(function(data){
                console.log(`Forecast Data is Now Available`);
                console.log(data);
                console.log(data.forecast.forecastday[0].day);

                //NOTE: To Extract forecast data use: data.forecast.forcastday[0].day
                let inches = (data.forecast.forecastday[0].day.totalprecip_in)*100;

                forecastHigh.innerHTML = `High for the Day | ${data.forecast.forecastday[0].day.maxtemp_f}°F`;
                forecastLow.innerHTML = `Low for the Day | ${data.forecast.forecastday[0].day.mintemp_f}°F`;
                forecastAvg.innerHTML = `Today's Average | ${data.forecast.forecastday[0].day.avgtemp_f}°F`;
                chanceOfRain.innerHTML = `Chance of Rain | ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
                rainInches.innerHTML = `Inches of Rain | ${inches} inches`;
                maxWindSpeed.innerHTML = `Windspeed | ${data.forecast.forecastday[0].day.maxwind_mph} mph`;

                
    
        }).catch((error)=> {console.log(`Forecast Not Available. Here's Why: ${error}`)});
        //-------------------------------------END OF FETCH-------------------------------------
}; //<-- End of Function

defaultWeather();
chooseLocation();









